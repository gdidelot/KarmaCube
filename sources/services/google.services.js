(function (angular) {
    'use strict';
	app.factory("googlesservices", ["$http", "$injector", "$rootScope", function($http, $injector, $rootScope) {	
		console.info("start to register googlesservices");
		var map;
		var gettextCatalog = $injector.get('gettextCatalog');
		var geolocalisation = undefined;
		var location = undefined;
		var geolocalisationExpirationTimeMinutes = 5;
		var geolocalisationTimeoutSeconds = 20;
		/* https://console.developers.google.com/apis/credentials?project=urbanium-1523360817609&authuser=0 */
		return {
			getCityCountryByLocation: function(callback, precise){
				if (navigator.geolocation) {
					console.log('googlesservices.getCityCountryByLocation : geolocation allowed');
					if(angular.isDefined(geolocalisation) && Math.round((((new Date() - geolocalisation.date) % 86400000) % 3600000) / 60000) < geolocalisationExpirationTimeMinutes){
						callback(geolocalisation);
					} else {
						navigator.geolocation.getCurrentPosition(function(position) {
							console.log('googlesservices.getCityCountryByLocation : getCurrentPosition success');
							$rootScope.notify(gettextCatalog.getString('Get_Current_Position_Success'), 'success');
							var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							var geoloc = new google.maps.Geocoder().geocode({'latLng' : latlng}, function(results, status) {
								if (status == google.maps.GeocoderStatus.OK) {
									if (results[1]) {
										var country = null, countryCode = null, city = null, cityAlt = null, zipcode = null, department = null;
										var c, lc, component;
										for (var r = 0, rl = results.length; r < rl; r += 1) {
											var result = results[r];

											if (!city && result.types[0] === 'locality') {
												for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
													component = result.address_components[c];

													if (component.types[0] === 'locality') {
														city = component.long_name;
														break;
													}
												}
											}
											else if (!zipcode && (result.address_components !== null || result.address_components !== undefined)) {
												for (var z = 0; result.address_components.length; z++) {
													component = result.address_components[z];
													if (component.types[0] === 'postal_code') {
														zipcode = component.long_name;
														break;
													} else if (component.types[0] === 'administrative_area_level_2') {
														department = component.long_name;
														break;
													}
												}
											}
											else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
												for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
													component = result.address_components[c];

													if (component.types[0] === 'administrative_area_level_1') {
														cityAlt = component.long_name;
														break;
													}
												}
											} else if (!country && result.types[0] === 'country') {
												country = result.address_components[0].long_name;
												countryCode = result.address_components[0].short_name;
											}

											if (city && country) {
												break;
											}
										}
										geolocalisation = {city: city, department: department, zipcode: zipcode, country: country, position: position, date: new Date()};
										callback(geolocalisation);
										console.log("City: " + city + "Department: " + department + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
									}
								}
							});
						}, function() {
							console.log('googlesservices.getCityCountryByLocation : failed');
							$rootScope.notify(gettextCatalog.getString('Location_Unknown'), 'warning');
							callback(false);
						},  {timeout: geolocalisationTimeoutSeconds * 1000, enableHighAccuracy: precise, maximumAge: 0});
					}
				} else {
					// Browser doesn't support Geolocation
					console.log('googlesservices.getCityCountryByLocation : error');
					$rootScope.notify(gettextCatalog.getString('Browser_Not_Support_Geolocation'), 'warning');
					callback(false);
				}
			},
			getMapByGeolocation: function(callback, elementId, position){
				map = new google.maps.Map(document.getElementById(elementId), {
					center: {lat: position.coords.latitude, lng: position.coords.longitude},
					zoom: 15,
					mapTypeId: 'satellite',
					disableDefaultUI: true
				});
				map.setTilt(45);
				callback(map);
			},
			searchCity: function(callback){
				var result = undefined;
				var request = {
					location: map.getCenter(),
					radius: '500',
					query: city
				};
				var service = new google.maps.places.PlacesService(map);
				service.textSearch(request, function(results, status){
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						map = new google.maps.Map(document.getElementById('map'), {
							center: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
							zoom: 15,
							mapTypeId: 'satellite',
							disableDefaultUI: true
						});
						map.setTilt(45);
						var geocoder = new google.maps.Geocoder();
						var latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
						geocoder.geocode({'latLng': latlng}, function(results, status) {
						  if (status == google.maps.GeocoderStatus.OK) {
								console.log('googlesservices.searchCity : success ' + JSON.stringify(results));
								if (results[1]) {
									if(results[1].formatted_address.indexOf(',') > -1) {
										result = results[1].formatted_address.split(',')[0];
									} else {
										result = results[1].formatted_address;
									}
									callback(result);
								} else {
									$rootScope.notify(gettextCatalog.getString('City_Not_Found'), 'warning');
								}
							}
						});

					  }
				});
			},
			searchLocation: function(callback){
				if(angular.isDefined(location) && Math.round((((new Date() - location.date) % 86400000) % 3600000) / 60000) < geolocalisationExpirationTimeMinutes){
					callback({ lat: location.latitude, lng: location.longitude });
				} else {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {
							location = {latitude: position.coords.latitude, longitude: position.coords.longitude, date: new Date()};
							callback({ lat: position.coords.latitude, lng: position.coords.longitude });
						}, function() {
							$rootScope.notify(gettextCatalog.getString('Location_Unknown'), 'warning');
						},  {timeout: 10000, enableHighAccuracy: true, maximumAge: 75000});
					} else {
						// Browser doesn't support Geolocation
						$rootScope.notify(gettextCatalog.getString('Browser_Not_Support_Geolocation'), 'warning');
					}
				}
			},
		};
	}]);

})(window.angular);
(function (angular) {
    'use strict';
    /**
    * Provide all default data
    */
    app.factory("externalconnectionservices", ["$http", "$rootScope", "$injector", function($http, $rootScope, $injector) {
	    console.info("start to register externalconnectionservices");
		
	    var gettextCatalog = $injector.get("gettextCatalog");
	    var $q = $injector.get("$q");
	    var userservices = $injector.get("userservices");
	    var googlesservices = $injector.get('googlesservices');
		
		var VALIDGOOGLEURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
		var googleACToken = undefined;
		
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '153290832169975',
				cookie     : true,
				xfbml      : true,
				version    : 'v2.12'
			});
			FB.AppEvents.logPageView();   
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		var getGoogleUserInfo = function(callback) {
			$.ajax({
				url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + googleACToken,
				data: null,
				success: function(resp) {
					console.log("externalconnectionservices.getGoogleUserInfo : get user informations success " + JSON.stringify(resp));
					if(angular.isDefined(resp.error) === false){
						var user = resp;
						userservices.getUserByEmail(function (data) {
							console.debug('userservices getUserByEmail received');
							if(data.isFailed) {
								$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
							}
							else {
								if(angular.isDefined(data.response) === false || data.response === null) {
									$rootScope.notify("Création de votre compte", 'warning');
									googlesservices.getCityCountryByLocation(function (citycountrydata) {
										googlesservices.searchLocation(function (locationdata) {
											console.debug('googlesservices getCityCountryByLocation received');
											var pseudo = user.given_name.toLowerCase().charAt(0).concat(user.family_name.toLowerCase());
											var newuser = { Firstname: user.given_name, Lastname: user.family_name, Email: user.email, City: citycountrydata.city, ZipCode: citycountrydata.zipcode, Pseudo: pseudo, Latitude: locationdata.lat, Longitude: locationdata.lng, Profile: 0};
											userservices.addUser(function (userdata) {
												console.debug('userservices addUser received');
												if(userdata.isFailed) {
													$rootScope.notify(gettextCatalog.getString(userdata.exception), 'warning');
												}
												else {
													$rootScope.currentuser = userdata.response;
													localStorage.removeItem('currentuser');
													localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
													$rootScope.notify(gettextCatalog.getString('User_Added'), 'success');
													$rootScope.notify('Veuillez lire vos mails afin de continuer', 'success');
													callback(false);
												}
											}, newuser);
										});
									});
								} else {
									$rootScope.currentuser = data.response;
									localStorage.removeItem('currentuser');
									localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
									callback(true);
								}
							}
						}, user.email);
					} else {
						$rootScope.notify(gettextCatalog.getString('Logging_Failed'), 'error');
						callback(false);
					}
				},
				dataType: "jsonp"
			});
		};
		
		var validateGoogleToken = function(callback, token) {
			$.ajax({
				url: VALIDGOOGLEURL + token,
				data: null,
				success: function(responseText){  
					getGoogleUserInfo(callback);
				},  
				dataType: "jsonp"  
			});
		};
		
		var gup = function(url, name) {
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var regexS = "[\\#&]"+name+"=([^&#]*)";
			var regex = new RegExp( regexS );
			var results = regex.exec( url );
			if( results == null )
				return "";
			else
				return results[1];
		};
		
		$rootScope.$on("configurationLoaded", function () {
			console.log("externalconnectionservices.configurationLoaded : event received");
			WL.init({
				client_id: '00000000442107AE',
				redirect_uri:  $rootScope.config.isDebug === 1 ? 'http://localhost/urbanium/trunk/src/' : 'https://www.urbanium.fr/',
				scope: "wl.signin", 
				response_type: "token"
			});
		});
		
	    return {
		    googleLogin: function(callback) {
				/* API : https://console.developers.google.com/apis/credentials?project=urbanium-1523360817609 */
				console.log('externalconnectionservices.googleLogin : called');
				var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
				var SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
				var CLIENTID    =   '940896770390-jom1id17s42a5h412qeule00dsg0pjmu.apps.googleusercontent.com'; /* secret oUG3w_tnpirGL6Cv0TOXmycO */
				var REDIRECT    =   $rootScope.config.isDebug === 1 ? 'http://localhost' : 'https://www.urbanium.fr/';
				var LOGOUT      =   'http://accounts.google.com/Logout';
				var TYPE        =   'token';
				var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
				var tokenType;
				var expiresIn;
				var user;
				var win         =   window.open(_url, "windowname1", 'width=800, height=600'); 

				var pollTimer   =   window.setInterval(function() { 
					try {
						console.log('externalconnectionservices.googleLogin : open ' + win.document.URL);
						if (win.document.URL.indexOf(REDIRECT) != -1) {
							window.clearInterval(pollTimer);
							var url =   win.document.URL;
							googleACToken =   gup(url, 'access_token');
							tokenType = gup(url, 'token_type');
							expiresIn = gup(url, 'expires_in');
							win.close();

							validateGoogleToken(callback, googleACToken);
						}
					} catch(e) {
						console.log(e);
					}
				}, 500);
		    },
			facebookLogin: function(callback) {
				//https://developers.facebook.com/apps/447121482374148/settings/basic/
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						console.log('externalconnectionservices.getLoginStatus : Already logged in with Facebook');
						FB.api('/me', {fields: 'id,last_name,first_name,email'}, function(response) {
							userservices.getUserByEmail(function (data) {
								console.debug('userservices getUserByEmail received');
								if(data.isFailed) {
									$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
								}
								else {
									if(angular.isDefined(data.response) === false || data.response === null) {
										$rootScope.notify("Création de votre compte", 'warning');
										googlesservices.getCityCountryByLocation(function (citycountrydata) {
											googlesservices.searchLocation(function (locationdata) {
												console.debug('googlesservices getCityCountryByLocation received');
												var pseudo = response.first_name.toLowerCase().charAt(0).concat(response.last_name.toLowerCase());
												var newuser = { Firstname: response.first_name, Lastname: response.last_name, Email: response.email, City: citycountrydata.city, ZipCode: citycountrydata.zipcode, Pseudo: pseudo, Latitude: locationdata.lat, Longitude: locationdata.lng, Profile: 0};
												userservices.addUser(function (userdata) {
													console.debug('userservices addUser received');
													if(userdata.isFailed) {
														$rootScope.notify(gettextCatalog.getString(userdata.exception), 'warning');
													}
													else {
														$rootScope.currentuser = userdata.response;
														localStorage.removeItem('currentuser');
														localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
														$rootScope.notify(gettextCatalog.getString('User_Added'), 'success');
														$rootScope.notify('Veuillez lire vos mails afin de continuer', 'success');
														callback(false);
													}
												}, newuser);
											});
										});
									} else {
										$rootScope.currentuser = data.response;
										localStorage.removeItem('currentuser');
										localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
										callback(true);
									}
								}
							}, response.email);
						});
					}
					else {
						FB.login(function(response) {
							if (response.authResponse) {
								console.log('Welcome!  Fetching your information.... ');
								FB.api('/me', {fields: 'id,last_name,first_name,email'}, function(response) {
									userservices.getUserByEmail(function (data) {
										console.debug('userservices getUserByEmail received');
										if(data.isFailed) {
											$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
										}
										else {
											if(angular.isDefined(data.response) === false || data.response === null) {
												$rootScope.notify("Création de votre compte", 'warning');
												googlesservices.getCityCountryByLocation(function (citycountrydata) {
													googlesservices.searchLocation(function (locationdata) {
														console.debug('googlesservices getCityCountryByLocation received');
														var pseudo = response.first_name.toLowerCase().charAt(0).concat(response.last_name.toLowerCase());
														var newuser = { Firstname: response.first_name, Lastname: response.last_name, Email: response.email, City: citycountrydata.city, ZipCode: citycountrydata.zipcode, Pseudo: pseudo, Latitude: locationdata.lat, Longitude: locationdata.lng, Profile: 0};
														userservices.addUser(function (userdata) {
															console.debug('userservices addUser received');
															if(userdata.isFailed) {
																$rootScope.notify(gettextCatalog.getString(userdata.exception), 'warning');
															}
															else {
																$rootScope.currentuser = userdata.response;
																localStorage.removeItem('currentuser');
																localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
																$rootScope.notify(gettextCatalog.getString('User_Added'), 'success');
																$rootScope.notify('Veuillez lire vos mails afin de continuer', 'success');
																callback(true);
															}
														}, newuser);
													});
												});
											} else {
												$rootScope.currentuser = data.response;
												localStorage.removeItem('currentuser');
												localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
												callback(true);
											}
										}
									}, response.email);
								});
							} else {
								console.log('User cancelled login or did not fully authorize.');
								callback(false);
							}
						},  
						{
							scope: 'email,user_likes', 
							return_scopes: true
						});
					}
				});
			},
			microsoftLogin: function(callback) {
				/* https://apps.dev.microsoft.com/?mkt=en-us&referrer=https%3a%2f%2faccount.live.com#/application/SAPI/00000000442107AE */
				WL.login({
					scope: ["wl.signin", "wl.basic", "wl.postal_addresses", "wl.phone_numbers", "wl.emails"]
				}).then(
					function (response) {
						WL.api({
							path: "me",
							method: "GET"
						}).then(
							function (response) {
								userservices.getUserByEmail(function (data) {
									console.debug('userservices getUserByEmail received');
									if(data.isFailed) {
										$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
									}
									else {
										if(angular.isDefined(data.response) === false || data.response === null) {
											$rootScope.notify("Création de votre compte", 'warning');
											googlesservices.getCityCountryByLocation(function (citycountrydata) {
												googlesservices.searchLocation(function (locationdata) {
													console.debug('googlesservices getCityCountryByLocation received');
													var pseudo = user.first_name.toLowerCase().charAt(0).concat(user.last_name.toLowerCase());
													var newuser = { Firstname: user.first_name, Lastname: user.last_name, Email: user.emails.preferred, City: citycountrydata.city, ZipCode: citycountrydata.zipcode, Pseudo: pseudo, Latitude: locationdata.lat, Longitude: locationdata.lng, Profile: 0};
													userservices.addUser(function (userdata) {
														console.debug('userservices addUser received');
														if(userdata.isFailed) {
															$rootScope.notify(gettextCatalog.getString(userdata.exception), 'warning');
														}
														else {
															$rootScope.currentuser = userdata.response;
															localStorage.removeItem('currentuser');
															localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
															$rootScope.notify(gettextCatalog.getString('User_Added'), 'success');
															$rootScope.notify('Veuillez lire vos mails afin de continuer', 'success');
															callback(false);
														}
													}, newuser);
												});
											});
										} else {
											$rootScope.currentuser = data.response;
											localStorage.removeItem('currentuser');
											localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
											callback(true);
										}
									}
								}, response.emails.preferred);
							},
							function (responseFailed) {
								$rootScope.notify(responseFailed.error.message, 'warning');
								callback(false);
							}
						);
					}, 
					function (responseFailed)
					{
						$rootScope.notify(responseFailed.error_description, 'warning');
						callback(false);
					}
				);
			}
	    };
    }]);
})(window.angular);
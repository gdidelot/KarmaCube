(function (angular) {
    'use strict';
	app.factory("materialservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register bookingservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getMaterials: function(callback) { 
				console.log('materialservices.getMaterials called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getMaterials", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("materialservices.getMaterials - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("materialservices.getMaterials - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getMaterial: function(callback, materialId) { 
				console.log('materialservices.getMaterial called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getMaterial", "user" : $rootScope.currentuser }, "materialId": materialId}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("materialservices.getMaterial - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("materialservices.getMaterial - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addMaterial: function(callback, material) { 
				console.log('materialservices.addMaterial called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addMaterial", "user" : $rootScope.currentuser }, "name": material.Name, "brand": material.Brand, "serialNumber": material.SerialNumber, "description": material.Description}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("materialservices.addMaterial - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("materialservices.addMaterial - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateMaterial: function(callback, material) { 
				console.log('materialservices.updateMaterial called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateMaterial", "user" : $rootScope.currentuser }, "materialId": material.Id, "name": material.Name, "brand": material.Brand, "serialNumber": material.SerialNumber, "description": material.Description}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("materialservices.updateMaterial - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("materialservices.updateMaterial - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			deleteMaterial: function(callback, material) { 
				console.log('materialservices.deleteMaterial called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteMaterial", "user" : $rootScope.currentuser }, "materialId": material.Id}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("materialservices.deleteMaterial - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("materialservices.deleteMaterial - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
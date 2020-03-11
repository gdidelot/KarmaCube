(function (angular) {
    'use strict';
	app.factory("cubeservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register cubeservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			obtenirCubes: function(callback) {
				console.log('cubeservices - start to obtenirCubes');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "obtenirCubes", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("obtenirCubes - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("obtenirCubes - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			ajouterCube: function(callback, texture, positionX, positionY, positionZ) {
				console.log('cubeservices - start to ajouterCube');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "ajouterCube", "user" : $rootScope.currentuser }, "texture": texture, "positionX": positionX, "positionY": positionY, "positionZ": positionZ}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("ajouterCube - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("ajouterCube - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		}
	}]);
})(window.angular);
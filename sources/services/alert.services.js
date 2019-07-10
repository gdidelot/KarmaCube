(function (angular) {
    'use strict';
	app.factory("alertservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register blogservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getAlerts: function(callback, townHall) { 
				console.log('alertservices.getAlerts called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getAlerts", "user" : $rootScope.currentuser }, "townHallId": townHall.Id});
				requestPromise.success(function(data, status) {	
					console.info("alertservices.getAlerts - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("alertservices.getAlerts - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			deleteAlert: function(callback, alert) { 
				console.log('alertservices.deleteAlert called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteAlert", "user" : $rootScope.currentuser }, "alertId": alert.Id});
				requestPromise.success(function(data, status) {	
					console.info("alertservices.deleteAlert - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("alertservices.deleteAlert - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
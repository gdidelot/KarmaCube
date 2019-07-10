(function (angular) {
    'use strict';
	app.factory("activityservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register addressservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getActivities: function(callback, user) { 
				console.log('activityservices.getActivities called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getActivities", "user" : $rootScope.currentuser }, "userId": (angular.isDefined(user)) ? user.Id : undefined});
				requestPromise.success(function(data, status) {	
					console.info("activityservices.getActivities - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("activityservices.getActivities - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
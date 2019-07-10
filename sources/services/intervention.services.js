(function (angular) {
    'use strict';
	app.factory("interventionservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register interventionservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getInterventions: function(callback, user) {
				console.log('interventionservices.getInterventions called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getInterventions", "user" : $rootScope.currentuser }, "userId": user.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getInterventions - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getInterventions - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addIntervention: function(callback, intervention) {
				console.log('interventionservices.getInterventions called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addIntervention", "user" : $rootScope.currentuser }, "userId": intervention.User.Id, "date": intervention.InterventionDate, "title": intervention.Title, "description": intervention.Description, "remarks": intervention.Remarks }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("addIntervention - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("addIntervention - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
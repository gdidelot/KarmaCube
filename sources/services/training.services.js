(function (angular) {
    'use strict';
	app.factory("trainingservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register trainingservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getTrainings: function(callback) {
				console.log('trainingservices.getTrainings called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getTrainings", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getTrainings - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getTrainings - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addTraining: function(callback, training) {
				console.log('trainingservices.addTraining called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });																											
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addTraining", "user" : $rootScope.currentuser }, "title": training.Title, "description": training.Description, "startDate": training.StartDate, "endDate": training.EndDate, "externPrice": training.ExternPrice, "adherentPrice": training.AdherentPrice }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("addTraining - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("addTraining - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateTraining: function(callback, training) {
				console.log('trainingservices.updateTraining called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });																											
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateTraining", "user" : $rootScope.currentuser }, "trainingId": training.Id, "title": training.Title, "description": training.Description, "startDate": training.StartDate, "endDate": training.EndDate, "externPrice": training.ExternPrice, "adherentPrice": training.AdherentPrice }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("updateTraining - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("updateTraining - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			deleteTraining: function(callback, training) {
				console.log('trainingservices.deleteTraining called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });																											
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteTraining", "user" : $rootScope.currentuser }, "trainingId": training.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("deleteTraining - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("deleteTraining - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getUserTrainings: function(callback, user) {
				console.log('trainingservices.getUserTrainings called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUserTrainings", "user" : $rootScope.currentuser }, "userId": user.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getUserTrainings - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getUserTrainings - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getTrainingUsers: function(callback, training) {
				console.log('trainingservices.getTrainingUsers called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getTrainingUsers", "user" : $rootScope.currentuser }, "trainingId": training.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getTrainingUsers - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getTrainingUsers - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addUserTraining: function(callback, usertraining) {
				console.log('trainingservices.addUserTraining called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addUserTraining", "user" : $rootScope.currentuser }, "userId": usertraining.User.Id, "trainingId": usertraining.Training.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("addUserTraining - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("addUserTraining - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateUserTraining: function(callback, usertraining) {
				console.log('trainingservices.updateUserTraining called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateUserTraining", "user" : $rootScope.currentuser }, "userId": usertraining.User.Id, "trainingId": usertraining.Training.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("updateUserTraining - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("updateUserTraining - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			deleteUserTraining: function(callback, usertraining) {
				console.log('trainingservices.deleteUserTraining called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteUserTraining", "user" : $rootScope.currentuser }, "userTrainingId": usertraining.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("deleteUserTraining - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("deleteUserTraining - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getUserTrainingStates: function(callback) {
				console.log('trainingservices.getUserTrainingStates called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUserTrainingStates", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getUserTrainingStates - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getUserTrainingStates - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
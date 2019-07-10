(function (angular) {
    'use strict';
	app.factory("mailservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register mailservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getMails: function(callback) {
				console.log('mailservices.getMails : Start to call service');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getMails", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getMails - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getMails - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getMailMessage: function(callback, index) {
				console.log('mailservices.getMailMessage : Start to call service');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getMailMessage", "user" : $rootScope.currentuser }, "index": index}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getMailMessage - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getMailMessage - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			deleteMail: function(callback, index) {
				console.log('mailservices.deleteMail : Start to call service');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteMail", "user" : $rootScope.currentuser }, "index": index}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("deleteMail - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("deleteMail - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			sendMail: function(callback, to, subject, message) {
				console.log('mailservices.sendMail : Start to call service');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "sendMail", "user" : $rootScope.currentuser }, "to": to, "subject": subject, "message": message}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("sendMail - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("sendMail - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
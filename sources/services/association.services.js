(function (angular) {
    'use strict';
	app.factory("associationservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register associationservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getUserAssociations: function(callback, user) { 
				console.log('associationservices.getUserAssociations called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUserAssociations", "user" : $rootScope.currentuser }, "userId": user.Id}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("associationservices.getUserAssociations - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("associationservices.getUserAssociations - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getAssociationUsers: function(callback, association) { 
				console.log('associationservices.getAssociationUsers called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getAssociationUsers", "user" : $rootScope.currentuser }, "associationId": association.Id}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("associationservices.getAssociationUsers - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("associationservices.getAssociationUsers - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getAssociations: function(callback) { 
				console.log('associationservices.getAssociations called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getAssociations", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("associationservices.getAssociations - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("associationservices.getAssociations - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addAssociation: function(callback, association) { 
				console.log('associationservices.addAssociation called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addAssociation", "user" : $rootScope.currentuser }, "name": association.Name, "phonenumber": association.PhoneNumber, "email": association.Email, "address": association.Address, "webaddress": association.WebAddress}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("associationservices.addAssociation - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("associationservices.addAssociation - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addUserAssociation: function(callback, user, association) { 
				console.log('associationservices.addUserAssociation called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addUserAssociation", "user" : $rootScope.currentuser }, "userId": user.Id, "associationId": association.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("associationservices.addUserAssociation - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("associationservices.addUserAssociation - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
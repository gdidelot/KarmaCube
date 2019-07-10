(function (angular) {
    'use strict';
	app.factory("userservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register userservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getProfiles: function(callback) {
				console.log('userservices - get all profiles');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getProfiles", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getProfiles - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getUsers - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getUsers: function(callback) {
				console.log('userservices - get all users');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUsers", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getUsers - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getUsers - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getCustomers: function(callback) {
				console.log('userservices - get all customers');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getCustomers", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getCustomers - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getCustomers - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			isLoggedIn : function() {
				return (toolsServices.getCurrentUser() !== undefined) ? true : false;
			},
			getLoggedUser: function() {
				return toolsServices.getCurrentUser();
			},
			authenticate: function(callback, mail, password) {
				console.log('userservices - start to authenticate');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "authenticate", "user" : undefined }, "mail" : mail, "password" : password }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.authenticate - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("authenticate - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			memberSubscription: function(callback, firstname, lastname, email, object, message) {
				console.log('userservices - add a member subscription');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "demandNewMember", "user" : $rootScope.currentuser }, "firstname" : firstname, "lastname" : lastname, "email" :  email, "object" : object, "message" : message}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("addNewMemberCommand - call success"); 	
					callback(data);				
				});
				requestPromise.error(function(data, status) {
					console.error("addNewMemberCommand - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			resetUserPassword: function(callback, id) {
				console.log('userServices - reset user password');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "resetUserPassword", "user" : $rootScope.currentuser }, "userid" : id}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("resetUserPassword - call success"); 	
					callback(data);				
				});
				requestPromise.error(function(data, status) {
					console.error("resetUserPassword - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateUserPassword: function(callback, id, newpassword) {
				console.log('userServices - update user password');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateUserPassword", "user" : $rootScope.currentuser }, "id" : id, "newPassword": newpassword}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("updateUserPassword - call success"); 	
					callback(data);				
				});
				requestPromise.error(function(data, status) {
					console.error("updateUserPassword - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addUser: function(callback, user) {       
				console.log('userServices - add user');			
				var canceller = $q.defer(); 
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addUser", "user" : $rootScope.currentuser }, "firstname": user.Firstname, "lastname": user.Lastname, "email" : user.Email, "phoneNumber": user.PhoneNumber, "street": user.Street, "zipcode": user.ZipCode,  "city": user.City }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userServices.addUser - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("addUser - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			deleteUser: function(callback, user) {       
				console.log('userServices - add user');			
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteUser", "user" : $rootScope.currentuser }, "id": user.Id}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userServices.deleteUser - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("deleteUser - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			generateNewPassword: function(callback, email) {
				console.log('userservices - generate a new password');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "generateNewPassword", "user" : $rootScope.currentuser }, "email" : email}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.generateNewPassword - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("generateNewPassword - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			regiterNewsLetter: function(callback, email) {
				console.log('userservices - register to newsletter');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "regiterNewsLetter", "user" : $rootScope.currentuser }, "email" : email}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.regiterNewsLetter - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("regiterNewsLetter - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateUser: function(callback, user) {   
				console.log('userservices - update user');					
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });																											
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateUser", "user" : $rootScope.currentuser }, "userId" : user.Id, "firstname" : user.Firstname, "lastname" : user.Lastname, "email": user.Email, "phoneNumber": user.PhoneNumber, "street": user.Street, "zipcode": user.ZipCode, "city": user.City, "profile": user.Profile}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.updateUser - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("updateUser - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getUserByEmail: function(callback, email) {
				console.log('userservices - get user by mail');					
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUserByEmail", "user" : $rootScope.currentuser }, "email" : email}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userServices.getUserByEmail - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getUserByEmail - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getUserTypes: function(callback) {
				console.log('userservices - get user types');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUserTypes", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userServices.getUserTypes - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getUserTypes - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			attachAvatarOnAnUser: function(callback, user, file){
				console.log('userServices - atttach an avatar');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var fd = new FormData();
				fd.append("service", "attachAvatarOnAnUser");
				fd.append("user", JSON.stringify($rootScope.currentuser));
				fd.append("userId", user.Id);
				fd.append("file", file);
				var requestPromise = $http.post(app.servicebase,
					fd,
					{ 
						withCredentials: true, headers: {'Content-Type': undefined }, transformRequest: angular.identity 
					}, { timeout: canceller.promise }
				);
				requestPromise.success(function(data, status) {
					console.info("attachAvatarOnAnUser - call success"); 	
					callback(data);		
				});
				requestPromise.error(function(data, status) {
					console.error("attachAvatarOnAnUser - call failed"); 	
					throw status + ' : ' + data;			
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateUserPosition: function(callback, user, latitude, longitude) {
				console.log('userservices - updateUserPosition');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateUserPosition", "user" : $rootScope.currentuser }, "userId": user.Id, "latitude": latitude, "longitude": longitude}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userServices.updateUserPosition - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("userServices.updateUserPosition - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			sendContact: function(callback, name, email, object, message) {
				console.log('userservices - sendContact');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "sendContact", "user" : undefined }, "name" : name, "email": email, "object": object, "message": message }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.sendContact - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("sendContact - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			attachLogoOnAnCompany: function(callback, user, file){
				console.log('userservices - atttach a logo');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var fd = new FormData();
				fd.append("service", "attachLogoOnAnCompany");
				fd.append("user", JSON.stringify($rootScope.currentuser));
				fd.append("userId", user.Id);
				fd.append("file", file);
				var requestPromise = $http.post(app.servicebase,
					fd,
					{ 
						withCredentials: true, headers: {'Content-Type': undefined }, transformRequest: angular.identity 
					}, { timeout: canceller.promise }
				);
				requestPromise.success(function(data, status) {
					console.info("attachLogoOnAnCompany - call success"); 	
					callback(data);		
				});
				requestPromise.error(function(data, status) {
					console.error("attachLogoOnAnCompany - call failed"); 	
					throw status + ' : ' + data;			
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			logout: function(callback, user) {
				console.log('userservices - get user types');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "logout", "user" : $rootScope.currentuser }, "userId": user.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.logout - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("userservices.logout - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getUserStates: function(callback) {
				console.log('userservices - get user states');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUserStates", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.getUserStates - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("userservices.getUserStates - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			sendValidationMail: function(callback, user) {
				console.log('userservices - send validation mail');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "sendValidationMail", "user" : $rootScope.currentuser }, "userId": user.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.sendValidationMail - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("userservices.sendValidationMail - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			unBanUser: function(callback, user) {
				console.log('userservices - unban an user');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "unBanUser", "user" : $rootScope.currentuser }, "userId": user.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.unBanUser - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("userservices.unBanUser - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			setUserAsOnline: function(callback, user) {
				console.log('userservices - unban an user');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "setUserAsOnline", "user" : $rootScope.currentuser }, "userid": user.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.setUserAsOnline - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("userservices.setUserAsOnline - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getUserNetworks: function(callback, user) {
				console.log('userservices - getUserNetworks');		
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getUserNetworks", "user" : $rootScope.currentuser }, "userId": user.Id }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("userservices.getUserNetworks - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("userservices.getUserNetworks - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
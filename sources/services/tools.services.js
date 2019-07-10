(function (angular) {
    'use strict';
	app.factory("toolsservices", ["$http", "$injector", function($http, $injector) {	
		console.info("start to register toolsservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			setParameters: function(json){
				parameters = json;
			},
			getParameters: function(){
				return parameters;
			},
			getConfiguration: function(callback) {
				console.info("toolsservices - get configuration called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getConfiguration", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getConfiguration - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getConfiguration - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getConfigurationFiles: function(callback) {
				console.info("toolsservices - getConfigurationFiles called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getParametersFiles", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getParametersFiles - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getConfigurationFiles - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			setCurrentUser: function(data){
				console.info("setCurrentUser - called with data : " + data); 
				if(typeof(Storage) !== undefined) 
				{
					localStorage.setItem("currentuser", JSON.stringify(data));
				} 
				else
				{
					$cookieStore.put("currentuser", JSON.stringify(data));
				}
			},
			getCurrentUser: function(){
				console.info("getCurrentUser - called");
				var currentUser = undefined;				
				if(typeof(Storage) !== undefined) {
					if (localStorage.getItem("currentuser") !== 'undefined' && localStorage.getItem("currentuser") !== undefined) {
						currentUser = JSON.parse(localStorage.getItem("currentuser"));
					}
				} 
				else 
				{
					currentUser = JSON.parse($cookieStore.get('currentuser'));
				}
				return (currentUser === null) ? undefined : currentUser;
			},
			removeCurrentUser: function(){
				console.info("removeCurrentUser - called"); 
				if(typeof(Storage) !== undefined) 
				{
					localStorage.removeItem("currentuser");
				} 
				else 
				{
					$cookieStore.remove('currentuser');
				}
			},
			getTranslations: function(callback) {
				console.log('toolsServices.getTranslations - get all translations');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getTranslations", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("getTranslations - call success"); 
					translations = data.response;
					callback(translations);
				});
				requestPromise.error(function(data, status) {
					console.error("toolsServices.getTranslations - call failed status : " + status); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			checkServerState: function(callback) {
				console.log('toolsServices.checkServerState - check server state');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "IsServerAvailable", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("IsServerAvailable - call success"); 
					if(data.isFailed === true)
					{
						throw data.exception;
					}
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("IsServerAvailable - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			createBackup: function(callback) {
				console.info("toolsServices - create a backup called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "createBackup", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("createBackup - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("createBackup - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			dropDatabase: function(callback) {
				console.info("toolsServices - drop the database called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "dropDatabase", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("dropDatabase - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("dropDatabase - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			createSchema: function(callback) {
				console.info("toolsServices - create the schema called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "createSchema", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("createSchema - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) 
				{
					console.error("createSchema - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateSchema: function(callback) {
				console.info("toolsServices - update the schema called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateSchema", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("updateSchema - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("updateSchema - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			setDefaultData: function(callback) {
				console.info("toolsServices - set the default data called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "setDefaultData", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("setDefaultData - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("setDefaultData - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getTotalSpace: function(callback, directory) {
				console.info("toolsServices - get the total space called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getTotalSpace", "user" : $rootScope.currentuser }, "directory" : directory}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getTotalSpace - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getTotalSpace - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			getFreeSpace: function(callback, directory) {
				console.info("toolsServices - get the free space called"); 
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getFreeSpace", "user" : $rootScope.currentuser }, "directory" : directory}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("getFreeSpace - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("getFreeSpace - call failed"); 	
					throw status + ' : ' + data;	
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			setParameter: function (parameterName, value) {
				console.info("setParameter - called with data : " + value);
				localStorage.setItem(parameterName, JSON.stringify(value));
			},
			getParameter: function (parameterName) {
				console.info("getParameter - called");
				return JSON.parse(localStorage.getItem(parameterName));
			},
			removeParameter: function (parameterName) {
				console.info("removeParameter - called");
				return localStorage.removeItem(parameterName);
			}
		};
	}]);

})(window.angular);
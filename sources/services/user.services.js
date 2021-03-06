(function (angular) {
    'use strict';
	app.factory("userservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register userservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			authenticate: function(callback, email, motdepasse) {
				console.log('userservices - start to authenticate');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "authentification", "user" : $rootScope.currentuser }, "email" : email, "motdepasse" : motdepasse }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("authenticate - call success"); 
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
			inscription: function(callback, email, motdepasse, anneeDeNaissance, prenom, nom) {
				console.log('userservices - start to inscription');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "inscription", "user" : $rootScope.currentuser }, "email" : email, "motdepasse" : motdepasse, "anneeDeNaissance" : anneeDeNaissance, "prenom" : prenom, "nom" : nom}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("inscription - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("inscription - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			}
			/*
			obtenirUtilisateurs: function(callback) {
				console.log('userservices - get all profiles');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "obtenirUtilisateurs", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {
					console.info("obtenirUtilisateurs - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.error("obtenirUtilisateurs - call failed"); 	
					throw status + ' : ' + data;		
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			}
			
			tuerouaider: function(callback) {
				console.log('userservices - get all users');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "tuerouaider", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
			MinerPouConstruire: function(callback) {
				console.log('userservices - get all users');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "MinerPouConstruire", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
			etapeparetape: function(callback) {
				console.log('userservices - get all users');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "etapeparetape", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		finaliserunequete: function(callback) {
				console.log('userservices - get all users');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "finaliserunequete", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		};
		evolutiondepoque: function(callback) {
			console.log('userservices - get all users');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "evolutiondepoque", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		};
		deplacementdanslesvillage: function(callback) {
			console.log('userservices - get all users');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deplacementdanslesvillage", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		ameliorationdukarma: function(callback) {
			console.log('userservices - get all users');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "ameliorationdukarma", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		combattredesboss: function(callback) {
			console.log('userservices - get all users');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "combattredesboss", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		combattredesboss: function(callback) {
			console.log('userservices - get all users');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "combattredesboss", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		rechercherdesobjetspourcontinuer: function(callback) {
			console.log('userservices - get all users');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "rechercherdespourcontinuer", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		baissedukarma: function(callback) {
			console.log('userservices - get all users');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "baissedukarma", "user" : $rootScope.currentuser } }, { timeout: canceller.promise });
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
		*/
		}
	}]);
})(window.angular);
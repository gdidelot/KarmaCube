/**
* Space services
*/
app.factory("documentservices", ["$http", "$injector", function($http, $injector) {
	console.info("start to register documentservices");
	var $rootScope = $injector.get('$rootScope');
	var $q = $injector.get('$q');
	var requestservices = $injector.get('requestservices');
	return {
		initializeProjectDocuments: function(callback, project) {
			console.log('documentservices.initializeProjectDocuments called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "initializeProjectDocuments", "user" : $rootScope.currentuser }, "projectId" : project.Id }, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("documentservices.initializeProjectDocuments - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("documentservices.initializeProjectDocuments - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		getDocuments: function(callback, path, filter) {
			console.log('documentservices - get documents');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getDocuments", "user" : $rootScope.currentuser }, "path" : path, "forceToRefresh" : true, "filter" : filter }, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {
				console.info("getDocuments - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.error("getDocuments - call failed"); 	
				throw status + ' : ' + data;		
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		getDocumentsCount: function(callback, path) {
			console.log('documentservices - get documents');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getDocumentsCount", "user" : $rootScope.currentuser }, "root" : path}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {
				console.info("getDocumentsCount - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.error("getDocumentsCount - call failed"); 	
				throw status + ' : ' + data;		
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		attachDocument: function(callback, shortpath, file, overwrite) {
			console.log('documentservices.attachDocument : called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var fd = new FormData();
			fd.append("service", "attachDocument");
			fd.append("user", JSON.stringify($rootScope.currentuser));
			fd.append("shortpath", shortpath);
			fd.append("overwrite", overwrite);
			fd.append("file", file);
			var requestPromise = $http.post(app.servicebase,
				fd,
				{ 
					withCredentials: true, headers: {'Content-Type': undefined }, transformRequest: angular.identity 
				}, { timeout: canceller.promise }
			);
			requestPromise.success(function(data, status) {
				console.info("attachDocument - call success"); 	
				callback(data);		
			});
			requestPromise.error(function(data, status) {
				console.error("attachDocument - call failed"); 	
				throw status + ' : ' + data;			
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		deleteDocument: function(callback, shortpath, document) {
			console.log('documentservices - get documents');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteDocument", "user" : $rootScope.currentuser }, "shortpath" : shortpath, "documentName": document.Name}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {
				console.info("deleteDocument - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.error("deleteDocument - call failed"); 	
				throw status + ' : ' + data;		
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		createFolder: function(callback, path, name) {
			console.log('documentservices - create a folder');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "createFolder", "user" : $rootScope.currentuser }, "path" : path, "name": name }, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {
				console.info("createFolder - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.error("createFolder - call failed"); 	
				throw status + ' : ' + data;		
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
	};
}]);
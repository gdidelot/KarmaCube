/**
* Space services
*/
app.factory("categoryservices", ["$http", "$injector", function($http, $injector) {
	console.info("start to register categoriesservices");
	var $rootScope = $injector.get('$rootScope');
	var $q = $injector.get('$q');
	var requestservices = $injector.get('requestservices');
	return {
		addCategory: function(callback, space) {
			console.log('categoryservices.addSpace called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addSpace", "user" : $rootScope.currentuser }, "name" : space.Name, "comments" : space.Comments, "parentId": (angular.isDefined(space.Parent) ? space.Parent.Id : undefined)}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("categoryservices.addSpace - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("categoryservices.addSpace - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		updateCategory: function(callback, space) {
			console.log('categoryservices.updateSpace called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateSpace", "user" : $rootScope.currentuser }, "id" : space.Id, "name" : space.Name, "comments" : space.Comments}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("categoryservices.updateSpace - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("categoryservices.updateSpace - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		deleteSpace: function(callback, space) {
			console.log('categoryservices.deleteSpace called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteSpace", "user" : $rootScope.currentuser }, "id" : space.Id}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("categoryservices.deleteSpace - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("categoryservices.deleteSpace - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		getSpaces: function(callback, category) {
			console.log('categoryservices.getSpaces called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getSpaces", "user" : $rootScope.currentuser }, "categoryId": (angular.isDefined(category)) ? category.Id : undefined}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("categoryservices.getSpaces - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("categoryservices.getSpaces - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		}
	};
}]);
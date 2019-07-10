/**
* article services
*/
app.factory("articleservices", ["$http", "$injector", function($http, $injector) {
	console.info("start to register articleservices");
	var $rootScope = $injector.get('$rootScope');
	var $q = $injector.get('$q');
	var requestservices = $injector.get('requestservices');
	return {
		addArticle: function(callback, article) {
			console.log('articleservices.addArticle called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addArticle", "user" : $rootScope.currentuser }, "name" : article.Name, "comments" : article.Comments, "reference" : article.Reference, "spaceId" : article.Category.Id, "supplierId" : article.Supplier.Id, "supplierPriceDutyFree" : article.SupplierPriceDutyFree, "resalePriceDutyFree" : article.ResalePriceDutyFree, "tax" : article.Tax, "isNovelty" : article.IsNovelty }, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.addArticle - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.addArticle - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		updateArticle: function(callback, article) {
			console.log('articleservices.updateArticle called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateArticle", "user" : $rootScope.currentuser }, "id" : article.Id, "name" : article.Name, "comments" : article.Comments, "reference" : article.Reference, "spaceId" : article.Category.Id, "supplierId" : article.Supplier.Id, "supplierPriceDutyFree" : article.SupplierPriceDutyFree, "resalePriceDutyFree" : article.ResalePriceDutyFree, "tax" : article.Tax, "isNovelty" : article.IsNovelty, "isOnline" : article.IsOnline, "weight": article.Weight, "quantity": article.Quantity, "barCode": article.BarCode }, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.updateArticle - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.updateArticle - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		attachPictureToArticle: function(callback, article, file) {
			console.log('articleservices - attach a picture');
			var fd = new FormData();
			fd.append("service", "attachPictureToArticle");
			fd.append("articleId", article.Id);
			fd.append("file", file); 
			$http.post(app.servicebase,
				fd,
				{ 
					withCredentials: true, headers: {'Content-Type': undefined }, transformRequest: angular.identity 
				}
			).
			success(function(data, status) 
			{
				console.info("attachPictureToArticle - call success"); 	
				callback(data);		
			})
			.
			error(function(data, status) 
			{
				console.error("attachPictureToArticle - call failed"); 	
				throw status + ' : ' + data;			
			});
		},
		deleteArticle: function(callback, article) {
			console.log('articleservices.deleteArticle called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteArticle", "user" : $rootScope.currentuser }, "id" : article.Id}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.deleteArticle - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.deleteArticle - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		getArticles: function(callback) {
			console.log('articleservices.getArticles called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getArticles", "user" : $rootScope.currentuser } });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.getArticles - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.getArticles - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		getArticlesFromCategory: function(callback, spaceId, filterOnline) {
			console.log('articleservices.getArticlesFromCategory called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getArticlesFromSpace", "user" : $rootScope.currentuser }, "spaceId": spaceId, "filterOnline" : filterOnline}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.getArticlesFromCategory - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.getArticlesFromCategory - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		addPictureArticle: function(callback, article, file) {
			console.log('articleservices - attach a thumb picture');
			var fd = new FormData();
			fd.append("service", "addPictureArticle");
			fd.append("articleId", article.Id);
			fd.append("file", file); 
			$http.post(app.servicebase,
				fd,
				{ 
					withCredentials: true, headers: {'Content-Type': undefined }, transformRequest: angular.identity 
				}
			).
			success(function(data, status) 
			{
				console.info("addPictureArticle - call success"); 	
				callback(data);		
			})
			.
			error(function(data, status) 
			{
				console.error("addPictureArticle - call failed"); 	
				throw status + ' : ' + data;			
			});
		},
		getPicturesArticle: function(callback, article) {
			console.log('articleservices.getPicturesArticle called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getPicturesArticle", "user" : $rootScope.currentuser }, "articleId": article.Id}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.getPicturesArticle - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.getPicturesArticle - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		getArticlesNovelty: function(callback) {
			console.log('articleservices.getArticlesNovelty called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getArticlesNovelty", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.getArticlesNovelty - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.getArticlesNovelty - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		searchArticles: function(callback, key) {
			console.log('articleservices.searchArticles called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "searchArticles", "user" : $rootScope.currentuser }, "key": key}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.searchArticles - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.searchArticles - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
		getSuggests: function(callback, customer) {
			console.log('articleservices.getSuggests called');
			var canceller = $q.defer();
			requestservices.add({ url: app.servicebase, canceller: canceller });
			var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getSuggests", "user" : $rootScope.currentuser }, "customerId": $rootScope.currentuser.Id}, { timeout: canceller.promise });
			requestPromise.success(function(data, status) {	
				console.info("articleservices.getSuggests - call success"); 
				callback(data);
			});
			requestPromise.error(function(data, status) {
				console.info("articleservices.getSuggests - call failed"); 
				throw status + ' : ' + data;
			});
			requestPromise.finally(function() {
				requestservices.remove(url);			
			});
		},
	};
}]);
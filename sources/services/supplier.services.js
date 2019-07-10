(function (angular) {
    'use strict';
	app.factory("supplierservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register supplierservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			getSuppliers: function(callback) { 
				console.log('supplierservices.getSuppliers called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "getSuppliers", "user" : $rootScope.currentuser }}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("supplierservices.getSuppliers - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("supplierservices.getSuppliers - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			addSupplier: function(callback, supplier) { 
				console.log('supplierservices.addSupplier called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addSupplier", "user" : $rootScope.currentuser }, "name": supplier.Name, "siret": supplier.SIRET, "addressId": supplier.Address.Id, "phone": supplier.Phone, "email": supplier.Email}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("supplierservices.addSupplier - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("supplierservices.addSupplier - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			updateSupplier: function(callback, supplier) { 
				console.log('supplierservices.updateSupplier called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "updateSupplier", "user" : $rootScope.currentuser }, "supplierId": supplier.Id, "name": supplier.Name, "siret": supplier.SIRET, "address": supplier.Address}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("supplierservices.updateSupplier - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("supplierservices.updateSupplier - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
			deleteSupplier: function(callback, supplier) { 
				console.log('supplierservices.deleteSupplier called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "deleteSupplier", "user" : $rootScope.currentuser }, "supplierId": supplier.Id}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("supplierservices.deleteSupplier - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("supplierservices.deleteSupplier - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
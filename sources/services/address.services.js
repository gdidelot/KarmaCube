(function (angular) {
    'use strict';
	app.factory("addressservices", ["$http", "$injector", function($http, $injector) {
		console.info("start to register addressservices");
		var $rootScope = $injector.get('$rootScope');
		var $q = $injector.get('$q');
		var requestservices = $injector.get('requestservices');
		return {
			addAddress: function(callback, address) { 
				console.log('addressservices.addAddress called');
				var canceller = $q.defer();
				requestservices.add({ url: app.servicebase, canceller: canceller });
				var requestPromise = $http.post(app.servicebase, { "context" : { "service" : "addAddress", "user" : $rootScope.currentuser }, "number": address.Number, "street" : address.Street, "complement": address.Complement, "zipcode": address.ZipCode, "city": address.City, "country": address.Country}, { timeout: canceller.promise });
				requestPromise.success(function(data, status) {	
					console.info("addressservices.addAddress - call success"); 
					callback(data);
				});
				requestPromise.error(function(data, status) {
					console.info("addressservices.addAddress - call failed"); 
					throw status + ' : ' + data;
				});
				requestPromise.finally(function() {
					requestservices.remove(url);			
				});
			},
		};
	}]);
})(window.angular);
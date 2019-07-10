(function (angular) {
    'use strict';
    /**
    * Provide all default data
    */
    app.factory("dataservices", ["$http", "$rootScope", "$injector", function($http, $rootScope, $injector) {
	    console.info("start to register dataservices");
		
	    var $q = $injector.get("$q");
		var gettextCatalog = $injector.get("gettextCatalog");
		var userservices = $injector.get('userservices');
		
		$rootScope.loadingdefaultdata = false;
		
		var userstates = [];
		var userprofiles = [];
		var usertrainingstates = [];
		
		var getUserStates = function() {
			var promiseGetUserStates = new window.Promise(function(resolve, reject) {
				if(angular.isDefined(userstates) === false || userstates.length === 0) {
					$rootScope.loadinguserstates = true;
					userservices.getUserStates(function (data) {
						console.debug('userservices getUserStates received');
						if(data.isFailed) {					
							$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
							reject(data);
						}
						else {
							userstates = data.response;
							resolve(data.response);
						}
						$rootScope.loadinguserstates = false;
					});
				} else {
					resolve(userstates);
				}
			});
			return promiseGetUserStates;
		};
		
	    return {
		    getDefaultData: function(callback, complete) {
			    $rootScope.loadingdefaultdata = true;
				console.log('loginservices - initialize service');
			    $q.all([getUserStates()])
				.then(function (data) {
					for(var i = 0; i < data.length; i++) {
						if(angular.isDefinedAndNotNull(data[i]) === false){
							data[i] = [];
						}
					}
					if(angular.isDefined(callback) && angular.isFunction(callback)) {
						callback(data);
					}
					if(angular.isDefined(complete) && angular.isFunction(complete)) {
						complete();
					}
					$rootScope.loadingdefaultdata = false;
				})
				.catch(function (error) {
				    throw error;
				});
		    }
	    };
    }]);
})(window.angular);
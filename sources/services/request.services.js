(function (angular) {
    'use strict';
    /**
    * Provide all default data
    */
    app.factory("requestservices", function() {
	    console.info("start to register requestservices");
	    var pending = [];
		
		return {
			get: function() {
				return pending;
			},
			add: function(request) {
				pending.push(request);
			},
			remove: function(request) {
				pending = _.filter(pending, function(p) {
					return p.url !== request;
				});
			},
			cancelAll: function() {
				angular.forEach(pending, function(p) {
					p.canceller.resolve();
				});
				pending.length = 0;
			}
		};
    });
})(window.angular);
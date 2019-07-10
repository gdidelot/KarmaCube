(function() {
    'use strict';
	app.directive('icheck', ['$timeout', '$parse', function($timeout, $parse) {
	  return {
		compile: function(element, $attrs) {
		  var icheckOptions = {
			checkboxClass: 'icheckbox_flat-green'
		  };

		  var modelAccessor = $parse($attrs['ngModel']);

		  return function ($scope, element, $attrs, controller) {

			var modelChanged = function(event) {
				$scope.$apply(function() {
					if(angular.isDefined(modelAccessor)) {
						modelAccessor.assign($scope, event.target.checked);
					}
				});
			};

			$scope.$watch(modelAccessor, function (val) {
				var action = val ? 'check' : 'uncheck';
				element.iCheck(icheckOptions,action).on('ifChanged', modelChanged);
			});
		  };
		}
	  };
	}]);
})();
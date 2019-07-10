(function() {
    'use strict';
	app.directive('loader', ['$rootScope', function($rootScope) {
		return {
			restrict: 'AE',
			templateUrl: 'directives/loader/loader.template.html',
			replace: true,
            transclude: true,
			scope: {
				displaying : '=',
			},
			link: function(scope, element, attrs)  {
				console.log('loader directive');
				var destroyOn = scope.$on('$destroy', function destroyDirective() {
					console.log('loader directive destroy.');
					destroyOn();
				});
			}
		};
	}]);
})();
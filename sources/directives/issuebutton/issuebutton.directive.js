(function() {
    'use strict';
	app.directive('issuebutton', ['$rootScope', function($rootScope) {
		return {
			restrict: 'AE',
			templateUrl: 'directives/issuebutton/issuebutton.template.html',
			scope: {
				callback: '&',
				title: '@',
				icon: '@'
			},
			link: function(scope, element, attrs)  {
				console.log('issuebutton directive');

				var initializeDirective = function () {
					console.log('issuebutton directive.initializeDirective : Initialize the issuebutton directive.');
					
				};

				scope.callbackCommand = function() {
					if(angular.isDefined(scope.callback) && angular.isFunction(scope.callback)) {
						scope.callback();
					}
				};

				var onViewContentLoaded = scope.$watch('$viewContentLoaded', function () {
					console.log('issuebutton directive received $viewContentLoaded');
					initializeDirective();
				});
				
				var destroyOn = scope.$on('$destroy', function destroyDirective() {
					console.log('issuebutton directive destroy.');
					destroyOn();
				});
				
			}
		};
	}]);
})();
/** 
* Define the mail controller
*
* @module malezhive-mails-plugin 
* @class malezhive-mails-plugin-controller
*/
(function() {
    'use strict';
	app.directive('malezhiveActivitiesDirective', ['$rootScope', function($rootScope) {
		return {
			restrict: 'AE',
			templateUrl: 'directives/activities/activities.view.html',
			replace: true,
			link: function(scope, element, attrs)  {
				console.log('malezhive activities directive');				

				var onViewContentLoaded = scope.$watch('$viewContentLoaded', function () {
					console.log('malezhive-activities-directive received $viewContentLoaded');
					initializeDirective();
				});
				
				var destroyOn = scope.$on('$destroy', function destroyDirective() {
					console.log('malezhive-activities-directive destroy.');
					destroyOn();
				});
				
			}
		};
	}]);
})();
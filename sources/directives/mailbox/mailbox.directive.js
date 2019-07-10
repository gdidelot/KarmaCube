(function() {
    'use strict';
	app.directive('mailbox', ['$rootScope', function($rootScope) {
		return {
			restrict: 'AE',
			templateUrl: 'directives/mailbox/mailbox.template.html',
			scope: {
				mails: '=',
				mailaddress: '=',
				sendmailcallback: '&',
				deletemailcallback: '&'
			},
			link: function(scope, element, attrs)  {
				console.log('mailbox directive');
				scope.toemail = '';
				scope.response = '';
				scope.creatingmail = false;

				var initializeDirective = function () {
					console.log('mailbox directive.initializeDirective : Initialize the mailbox directive.');
				};
				
				scope.createMailCommand = function() {
					scope.toemail = '';
					scope.response = '';
					scope.creatingmail = true;
				};
				
				scope.sendMailCallbackCommand = function(mail, index) {
					if(angular.isDefined(scope.sendmailcallback) && angular.isFunction(scope.sendmailcallback)) {
						scope.sendmailcallback(mail, index);
					}
				};
				
				scope.deletemailcallbackCommand = function() {
					if(angular.isDefined(scope.deletemailcallback) && angular.isFunction(scope.deletemailcallback)) {
						scope.deletemailcallback();
					}
				};

				var onViewContentLoaded = scope.$watch('$viewContentLoaded', function () {
					console.log('mailbox directive received $viewContentLoaded');
					initializeDirective();
				});
				
				var destroyOn = scope.$on('$destroy', function destroyDirective() {
					console.log('mailbox directive destroy.');
					destroyOn();
				});
				
			}
		};
	}]);
})();
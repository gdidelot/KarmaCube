/** 
* Define the login controller which manage current user, parameters, translations and menu behavior
*
* @module home 
* @class logincontroller
*/
app.controller('souscriptioncontroleur', ["$injector", "$scope", function($injector, $scope) {
	
	//#region Variables declarations
	var $rootScope = $injector.get('$rootScope');
	var $anchorScroll = $injector.get('$anchorScroll');
	var gettextCatalog = $injector.get('gettextCatalog');
	var toolsservices = $injector.get('toolsservices');
	var loginservices = $injector.get('loginservices');
	var modalservice = $injector.get('ModalService');
	var dataservices = $injector.get('dataservices');
	var userservices = $injector.get('userservices');
	
    //#endregion Variables declarations
	
	//#region Private functions
	
	/**
    * Initialize the controller
    */
    var initializeController = function () {
		console.log('logincontroleur.initializeController : Initialize the home controller.');

	};
	
	//#endregion Private functions
	
    //#region Public functions
	
	$scope.authenticateCommand = function(login) {
		$rootScope.authenticating = true;
		userservices.authenticate(function (data) {
			console.debug('userservices authenticate received');
			if(data.isFailed) {
				$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
			}
			else {
				$rootScope.currentuser = data.response;
				localStorage.removeItem('currentuser');
				localStorage.setItem('currentuser', JSON.stringify($rootScope.currentuser));
				$rootScope.changeLocation('game');
			}
			$rootScope.authenticating = false;
		}, login.Identifiant, login.MotDePasse);
	};
	
	$scope.resetPasswordCommand = function(email){
		$rootScope.retrievingpassword = true;
		userservices.generateNewPassword(function (data) {
			console.debug('userservices authenticate received');
			if(data.isFailed) {
				$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
			}
			else {
				$rootScope.notify(gettextCatalog.getString('Check_Your_Email'), 'warning');
				$rootScope.changeLocation('login');
			}
			$rootScope.retrievingpassword = false;
		}, email);
	};
	
	//#endregion Public functions
	
	//#region Events management

    var onViewContentLoaded = $scope.$watch('$viewContentLoaded', function () {
		console.log('logincontroleur received $viewContentLoaded');
		initializeController();
    });
	
	var destroyOn = $scope.$on('$destroy', function() {
        console.log('logincontroleur destroy.');
        destroyOn();
        onViewContentLoaded();
    });

    //#endregion Events management

}]);
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
	
	$scope.inscriptionCommand = function(utilisateur) {
		$rootScope.authenticating = true;
		userservices.inscription(function (data) {
			console.debug('userservices inscription received');
			if(data.isFailed) {
				$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
			}
			else {
				$rootScope.changeLocation('home');
			}
			$rootScope.authenticating = false;
		}, utilisateur.Identifiant, utilisateur.MotDePasse);
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
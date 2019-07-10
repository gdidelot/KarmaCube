/** 
* Define the home controller which manage current user, parameters, translations and menu behavior
*
* @module home 
* @class homecontroller
*/
app.controller('accueilcontroller', ["$injector", "$scope", "$location", function($injector, $scope, $location) {
	
	//#region Variables declarations
	var $rootScope = $injector.get('$rootScope');
	var $sce = $injector.get('$sce');
	var gettextCatalog = $injector.get('gettextCatalog');
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
		console.log('homecontroller.initializeController : Initialize the home controller.');
		
		loginservices.checkLoggedUser(function(){
			dataservices.getDefaultData(function(data){
			}, function(){
				
			});
		});
	};
	
	//#endregion Private functions
	
    //#region Public functions
	
	//#endregion Public functions
	
	//#region Events management

    var onViewContentLoaded = $scope.$watch('$viewContentLoaded', function () {
		console.log('homecontroller received $viewContentLoaded');
		initializeController();
    });
	
	var destroyOn = $scope.$on('$destroy', function() {
        console.log('homecontroller destroy.');
        destroyOn();
        onViewContentLoaded();
    });

    //#endregion Events management

}]);
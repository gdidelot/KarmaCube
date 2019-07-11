/** 
* Define the login controller which manage current user, parameters, translations and menu behavior
*
* @module home 
* @class logincontroller
*/
app.controller('logincontroleur', ["$injector", "$scope", "$location", function($injector, $scope, $location) {
	
	//#region Variables declarations
	var $rootScope = $injector.get('$rootScope');
	var $interval = $injector.get('$interval');
	var $timeout = $injector.get('$timeout');
	var $anchorScroll = $injector.get('$anchorScroll');
	var gettextCatalog = $injector.get('gettextCatalog');
	var toolsservices = $injector.get('toolsservices');
	var loginservices = $injector.get('loginservices');
	var modalservice = $injector.get('ModalService');
	var dataservices = $injector.get('dataservices');
	var userservices = $injector.get('userservices');
	
	var scene = undefined;
	var camera = undefined;
	var renderer = undefined;
	var cube = undefined;
	
    //#endregion Variables declarations
	
	//#region Private functions
	
	var animationCube = function() {
		requestAnimationFrame( animationCube );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		
		cube.position.x += 0.01;

		renderer.render( scene, camera );
	};
	
	var initialisationScene = function() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x229922 } );
		cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		camera.position.z = 5;

		animationCube();
	};
	
	/**
    * Initialize the controller
    */
    var initializeController = function () {
		console.log('logincontroleur.initializeController : Initialize the home controller.');
		
		initialisationScene();
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
				$rootScope.changeLocation('home');
			}
			$rootScope.authenticating = false;
		}, login.identifier, login.password);
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
		console.log('logincontroller received $viewContentLoaded');
		initializeController();
    });
	
	var destroyOn = $scope.$on('$destroy', function() {
        console.log('logincontroller destroy.');
        destroyOn();
        onViewContentLoaded();
    });

    //#endregion Events management

}]);
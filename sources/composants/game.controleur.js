/** 
* Define the login controller which manage current user, parameters, translations and menu behavior
*
* @module home 
* @class logincontroller
*/
app.controller('gamecontroleur', ["$injector", "$scope", "$location", function($injector, $scope, $location) {
	
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
	var controls = undefined;
	var container = undefined;
	var stats = undefined;
	var camera= undefined;
	var worldWidth = 200;
	var worldDepth = 200;
	var worldHalfWidth = worldWidth / 2;
	var worldHalfDepth = worldDepth / 2;
	var data = undefined;
	var clock = new THREE.Clock();
	
    //#endregion Variables declarations
	
	//#region Private functions

	var onWindowResize = function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );

	};

	var getY = function( x, z ) {
		return ( data[ x + z * worldWidth ] * 0.2 ) | 0;
	};
			
	var generateHeight = function( width, height ) {
		var data = [], perlin = new THREE.ImprovedNoise(), size = width * height, quality = 2, z = Math.random() * 100;
		for ( var j = 0; j < 4; j ++ ) {
			if ( j == 0 ) for ( var i = 0; i < size; i ++ ) data[ i ] = 0;
			for ( var i = 0; i < size; i ++ ) {
				var x = i % width, y = ( i / width ) | 0;
				data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
			}
			quality *= 4;
		}
		return data;
	};
	
	var animate = function() {
		requestAnimationFrame( animate );
				
		mesh1.rotation.x += 0.000;
		mesh1.rotation.y += 0.000;

		renderer.render( scene, camera );
	};

	var render = function() {
		controls.update( clock.getDelta() );
		renderer.render( scene, camera );
	};
	
    var initialisationScene = function() {
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 400;

		scene = new THREE.Scene();

		var texture1 = new THREE.TextureLoader().load( 'themes/defaut/images/textures/ciel.jpg');
		var texture2 = new THREE.TextureLoader().load( 'themes/defaut/images/textures/bibliotheque.jpg');

		var geometry1 = new THREE.BoxBufferGeometry( 200, 200, 200 );
		var geometry2 = new THREE.BoxBufferGeometry( 200, 200, 200 );
		var material1 = new THREE.MeshBasicMaterial( { map: texture1 } );
		var material2 = new THREE.MeshBasicMaterial( { map: texture2 } );

		mesh1 = new THREE.Mesh( geometry1, material1 );
		mesh2 = new THREE.Mesh( geometry2, material2 );
		
		mesh2.position.x = 210;
		mesh2.position.y = 0;
		mesh2.position.z = 0;
		
		scene.add( mesh1 );
		scene.add( mesh2 );

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		window.addEventListener( 'resize', onWindowResize, false );
	};
	
	/**
    * Initialize the controller
    */
    var initializeController = function () {
		console.log('gamecontroleur.initializeController : Initialize the home controller.');

        //if (angular.isDefined($rootScope.currentuser) && $rootScope.currentuser !== null) {
        //    initialisationScene();
        //    animate();
        //} else {
        //    $rootScope.changeLocation('login');
        //}
		
		initialisationScene();
        animate();
		
	};
	
	//#endregion Private functions
	
    //#region Public functions
	
	//#endregion Public functions
	
	//#region Events management

    var onViewContentLoaded = $scope.$watch('$viewContentLoaded', function () {
		console.log('gamecontroleur received $viewContentLoaded');
		initializeController();
    });
	
	var destroyOn = $scope.$on('$destroy', function() {
        console.log('gamecontroleur destroy.');
        destroyOn();
        onViewContentLoaded();
    });

    //#endregion Events management

}]);
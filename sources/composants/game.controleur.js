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
	var meshes = [];
	var controls = undefined;
	var container = undefined;
	
    //#endregion Variables declarations
	
	//#region Private functions

	var animate = function() {
		requestAnimationFrame( animate );
		
		angular.forEach(meshes, function(mesh){
			mesh.rotation.x += 0.000;
			mesh.rotation.y += 0.000;
		});
		
		controls.update();
		
		renderer.render( scene, camera );
	};
	
	var genererCube = function(texture, positionX, positionY) {
		var texture = new THREE.TextureLoader().load( 'themes/defaut/images/textures/' + texture);
		var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
		var material = new THREE.MeshBasicMaterial( { map: texture } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = positionX;
		mesh.position.y = positionY === undefined ? 0 : positionY;
		mesh.position.z = 0;
		mesh.addEventListener( 'click', onMeshClick, false );
		meshes.push(mesh);
		scene.add( mesh );
		return mesh;
	};

    var initialisationScene = function() {
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.x =   0;
		camera.position.y = 1.5;
		camera.position.z = 1000;
		
		scene = new THREE.Scene();
		
		// Génération de la grille
		var size = 10, step = 1;
		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial({color: 'white'});
		for(var i = -size;i <= size; i += step) {
			geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
			geometry.vertices.push(new THREE.Vector3( size, -0.04, i));
			
			geometry.vertices.push(new THREE.Vector3( i, -0.04, -size));
			geometry.vertices.push(new THREE.Vector3( i, -0.04,  size));
		}
		var line = new THREE.Line(geometry, material, THREE.LineSegments);
		scene.add(line);
		
		genererCube('ciel.jpg', meshes.length * 200);
		genererCube('ciel.jpg', meshes.length * 200);

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
		
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.update();

		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener( 'click', onWindowClick, false );
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
	
	var onMeshClick = function(event) {
		alert(event);
	};
	
	var onWindowClick = function(event) {
		 event = event || window.event;
		var pageX = event.pageX;
		var pageY = event.pageY;

		// IE 8
		if (pageX === undefined) {
			pageX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pageY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		console.log(pageX, pageY);
		genererCube('ciel.jpg', pageX, -pageY);
	};
	
	var onWindowResize = function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	};

    var onViewContentLoaded = $scope.$watch('$viewContentLoaded', function () {
		console.log('gamecontroleur received $viewContentLoaded');
		initializeController();
    });
	
	var destroyOn = $scope.$on('$destroy', function() {
        console.log('gamecontroleur destroy.');
        destroyOn();
        onViewContentLoaded();
		onWindowResize();
    });

    //#endregion Events management

}]);
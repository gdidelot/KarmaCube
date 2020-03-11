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
	var cubeservices = $injector.get('cubeservices');
	
	var scene = undefined;
	var camera = undefined;
	var renderer = undefined;
	var meshes = [];
	var controls = undefined;
	var container = undefined;
	var stats = undefined;
	
	var CUBESIZE = 1;
	
	var mouse = { x: 0, y: 0 };
	var projector = undefined;
	
    //#endregion Variables declarations
	
	//#region Private functions

	var animate = function() {
		requestAnimationFrame( animate );
		
		angular.forEach(meshes, function(mesh){
			mesh.rotation.x += 0.000;
			mesh.rotation.y += 0.000;
		});
		
		stats.update();
		controls.update();
		
		renderer.render( scene, camera );
	};
	
	function update()
	{
		// find intersections

		// create a Ray with origin at the mouse position
		//   and direction into the scene (camera direction)
		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
		projector.unprojectVector( vector, camera );
		var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

		// create an array containing all objects in the scene with which the ray intersects
		var intersects = ray.intersectObjects( scene.children );

		// INTERSECTED = the object in the scene currently closest to the camera 
		//		and intersected by the Ray projected from the mouse position 	
		
		// if there is one (or more) intersections
		if ( intersects.length > 0 )
		{
			// if the closest object intersected is not the currently stored intersection object
			if ( intersects[ 0 ].object != INTERSECTED ) 
			{
				// restore previous intersection object (if it exists) to its original color
				if ( INTERSECTED ) 
					INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
				// store reference to closest object as current intersection object
				INTERSECTED = intersects[ 0 ].object;
				// store color of closest object (for later restoration)
				INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
				// set a new color for closest object
				INTERSECTED.material.color.setHex( 0xffff00 );
			}
		} 
		else // there are no intersections
		{
			// restore previous intersection object (if it exists) to its original color
			if ( INTERSECTED ) 
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			// remove previous intersection object reference
			//     by setting current intersection object to "nothing"
			INTERSECTED = null;
		}


		if ( keyboard.pressed("z") ) 
		{ 
			// do something
		}
		
		controls.update();
		stats.update();
	}
	
	var genererCube = function(texture, positionX, positionY, positionZ) {
		var texture = new THREE.TextureLoader().load( 'themes/defaut/images/textures/' + texture);
		var geometry = new THREE.BoxBufferGeometry( CUBESIZE, CUBESIZE, CUBESIZE );
		var material = new THREE.MeshBasicMaterial( { map: texture } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = positionX;
		mesh.position.y = positionY === undefined ? 0 : positionY;
		mesh.position.z = positionZ === undefined ? 0 : positionZ;
		mesh.addEventListener( 'click', onMeshClick, false );
		meshes.push(mesh);
		scene.add( mesh );
		return mesh;
	};

    var initialisationScene = function() {
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.set( 0, 0, 100 );
		camera.lookAt( 0, 0, 0 );
		
		scene = new THREE.Scene();
		
		// Génération de la grille
		//var size = 100, step = 1;
		//var geometry = new THREE.Geometry();
		//var material = new THREE.LineBasicMaterial({color: 'white'});
		//for(var i = -size;i <= size; i += step) {
		//	geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
		//	geometry.vertices.push(new THREE.Vector3( size, -0.04, i));
		//	
		//	geometry.vertices.push(new THREE.Vector3( i, -0.04, -size));
		//	geometry.vertices.push(new THREE.Vector3( i, -0.04,  size));
		//}
		//var line = new THREE.Line(geometry, material, THREE.LineSegments);
		//scene.add(line);
		// FLOOR
		var floorTexture = new THREE.ImageUtils.loadTexture( 'themes/defaut/images/textures/herbe.jpg' );
		floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
		floorTexture.repeat.set( 10, 10 );
		var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
		var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
		var floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.position.y = -0.5;
		floor.rotation.x = Math.PI / 2;
		scene.add(floor);
		
		
		// Génération des cubes
		$scope.chargercarte = true;
		cubeservices.obtenirCubes(function (data) {
			console.debug('cubeservices obtenirCubes received');
			if(data.isFailed) {
				$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
			}
			else {
				$scope.cubes = data.response;
				
				for(var i = 0; i < $scope.cubes.length; i++) {
					var cube = $scope.cubes[i];
					genererCube(cube.Texture, cube.PositionX, cube.PositionY, cube.PositionZ);
				}
			}
			$scope.chargercarte = false;
		});
				
		// Lumière du jour
		var light = new THREE.DirectionalLight( 0xaabbff, 0.3 );
		light.position.x = 300;
		light.position.y = 250;
		light.position.z = - 500;
		scene.add( light );
		
		// Ciel
		var skyTexture = new THREE.ImageUtils.loadTexture( 'themes/defaut/images/textures/ciel.jpg' );
		var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
		var skyBoxMaterial = new THREE.MeshBasicMaterial( { map: skyTexture, side: THREE.BackSide } );
		var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
		scene.add(skyBox);
		
		// Rendu
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
		
		// Statistiques
		stats = new Stats();
		document.body.appendChild( stats.dom );
		
		// Controles
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.update();

		document.addEventListener( 'resize', onWindowResize, false );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'click', onWindowClick, false );
		
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
	
	function onDocumentMouseMove( event ) 
	{
		// the following line would stop any other event handler from firing
		// (such as the mouse's TrackballControls)
		// event.preventDefault();
		
		// update the mouse variable
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}
	
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
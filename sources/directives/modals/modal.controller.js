(function() {
    'use strict';
	
	app.controller('modalcontroller', ['$timeout', '$scope', 'close', 'object', function($timeout, $scope, close, object) {
		
		//#region Variables declarations
		
		$scope.object = object;
		
		//#endregion Variables declarations
		
		//#region Public 
		
		$scope.close = function(result) {
			close(result, 500); // close, but give 500ms for bootstrap to animate
		};
		
		//#endregion Public
		
		//#region Events management
		
		var timeout = $timeout(function() {
			$scope.$broadcast('reCalcViewDimensions');
			$scope.$broadcast('rzSliderForceRender');
		}, 500);
		
		var destroyOn = $scope.$on('$destroy', function destroyController() {
			console.log('modalcontroller destroy.');
			destroyOn();
			$scope.object = undefined;
			timeout = undefined;
		});
		
		//#endregion Events management
	}]);
	
})();
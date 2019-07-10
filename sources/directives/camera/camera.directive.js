(function() {
    'use strict';
	app.directive('camera', ['$rootScope', function($rootScope) {
		return {
			restrict: 'AE',
			templateUrl: 'directives/camera/camera.template.html',
			replace: true,
			link: function(scope, element, attrs)  {
				console.log('camera directive');
				
				var video = document.querySelector('video');
				var canvas = document.querySelector('canvas');
				var elementsnapshot = document.getElementById('element_snapshot');
				var ctx = canvas.getContext('2d');
				var localMediaStream = null;
				scope.issupported = false;
				
				var successCallback = function(stream) {
					console.log('camera.successCallback : Activate the video succeed.');
					video.src = window.URL.createObjectURL(stream);
					localMediaStream = stream;
					var videoCameraHeight = $('#video_camera').height();
					$('#element_snapshot').height(videoCameraHeight);
				};
				
				var errorCallback = function() {
					scope.issupported = false;
					console.log('camera.initializeDirective : Failed to get local stream');
				};

				var initializeDirective = function () {
					console.log('camera directive.initializeDirective : Initialize the camera directive.');
					navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
					if (angular.isDefined(navigator.getUserMedia) && navigator.getUserMedia != null) {
						if (navigator.getUserMedia) {
							scope.issupported = true;
							navigator.getUserMedia({video: true}, successCallback, errorCallback);
						} else {
							console.log('camera.initializeDirective : Is not supported in your browser.');
							scope.issupported = false;
						}
					} else {
						console.log('camera.initializeDirective : Is not supported in your browser.');
						cope.issupported = false;
					}
				};

				scope.snapshot = function() {
					if (localMediaStream) {
						var videoCameraHeight = $('#video_camera').height();
						$('#element_snapshot').height(videoCameraHeight);
						ctx.drawImage(video, 0, 0);
						// "image/webp" works in Chrome.
						// Other browsers will fall back to image/png.
						elementsnapshot.src = canvas.toDataURL('image/png');
						
						$rootScope.$broadcast('Camera_Snapshot', elementsnapshot.src);
						$rootScope.$emit('Camera_Snapshot', elementsnapshot.src);
					}
				};

				var onViewContentLoaded = scope.$watch('$viewContentLoaded', function () {
					console.log('camera directive received $viewContentLoaded');
					initializeDirective();
				});
				
				var destroyOn = scope.$on('$destroy', function destroyDirective() {
					console.log('camera directive destroy.');
					destroyOn();
				});
				
			}
		};
	}]);
})();
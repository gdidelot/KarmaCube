(function() {
    'use strict';
	/**
	* Directive to move on shared directives folder
	*/
	app.directive('fileDropzone', function(){
		return {
		  restrict: 'A',
		  scope: {
			file: '=',
			fileName: '='
		  },
		  link: function(scope, element, attrs) {
			
			//#region Variables declarations
			
			var validMimeTypes = attrs.fileDropzone;
			
			//#endregion Variables declarations
			
			//#region Private functions
			
			var processDragOverOrEnter = function(event) {
				if (event !== null) {
					event.preventDefault();
				}
				event.dataTransfer = event.originalEvent.dataTransfer;
				event.dataTransfer.effectAllowed = 'copy';
				return false;
			};
			
			var checkSize = function(size) {
				var _ref;
				if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
					return true;
				} else {
					if(toastr !== undefined){
						//TODO : to translate
					   toastr.warning('File_Cannot_Exceed ' + attrs.maxFileSize + ' MB');
					}
					else {
						alert('File_Cannot_Exceed ' + attrs.maxFileSize + ' MB');
					}
					return false;
				}
			};
			
			var isTypeValid = function(type) {
				var result = false;
				if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
					result = true;
				} else {
					if(toastr !== undefined){
					   toastr.warning('Fichier non pris en charge.  Les types acceptes sont : ' + validMimeTypes);
					}
					else {
						alert('Fichier non pris en charge.  Les types acceptes sont :' + validMimeTypes);
					}
					result = false;
				}
				
				return result;
			};
			
			//#endregion Private functions
			
			element.bind('dragover', processDragOverOrEnter);
			element.bind('dragenter', processDragOverOrEnter);
			
			return element.bind('drop', function(event) {
				var file, name, reader, size, type;
				if (event !== null) {
					event.preventDefault();
				}
				
				reader = new FileReader();
				reader.onload = function(evt) {
					if (checkSize(size) && isTypeValid(type)) {
						return scope.$apply(function() {
							scope.file = evt.target.result;
							if (angular.isString(scope.fileName)) {
								scope.fileName = name;
								return scope.fileName;
							}
						});
					}
				};

				event.dataTransfer = event.originalEvent.dataTransfer;
				file = event.dataTransfer.files[0];
				if(angular.isDefined(file)){
					name = file.name;
					type = file.type;
					size = file.size;
					reader.readAsDataURL(file);
					
					console.log('Broadcast event ' + attrs.eventName + ' dropFilesEvent with ' + event.dataTransfer.files.length + ' file(s)');
					// firing an event upwards
					scope.$emit(attrs.eventName, event.dataTransfer.files);
					// firing an event downwards
					scope.$broadcast(attrs.eventName, event.dataTransfer.files);
					
					if(angular.isDefined(scope.$root)){
						scope.$root.$emit(attrs.eventName, event.dataTransfer.files);
						scope.$root.$broadcast(attrs.eventName, event.dataTransfer.files);
					}
					
				}
				return false;
			});
		  }
		};
	});
})();
(function() {
    'use strict';
	/**
	* Directive to move on shared directives folder
	*/
	app.directive('tableSort', ['$parse', function($parse){
		return {
		  restrict: 'A',
		  link: function(scope, element, attrs) {
			
			//#region Variables declarations
			
			var currentstate = undefined; // Values : undefined, asc, desc
			
			//#endregion Variables declarations
			
			//#region Private functions
			
			var setCaret = function(way) {
				element.find('.fa').remove();
				var caret = '<i class="fa fa-caret-' + way + '"></i>';
				element.append(caret);
			};
			
			var sortArray = function(way) {
				var list = scope.$eval(attrs.tableSortArray);
				var model = $parse(attrs.tableSortArray);
				var temp = [];
				if(way === 'down') {
					temp = Enumerable.from(list).orderBy(function(i){ return i[attrs.tableSortVariable]; }).toArray();
				} else if(way === 'up') {
					temp = Enumerable.from(list).orderByDescending(function(i){ return i[attrs.tableSortVariable]; }).toArray();
				}
				
				model.assign(scope, temp);
				if (!scope.$$phase && (scope.$root && !scope.$root.$$phase)) {
					scope.$digest();
				}
			};
			
			element.bind("click", function(event) {
				if(currentstate === undefined || currentstate === 'desc'){
					//Sort to asc
					setCaret('down');
					sortArray('down');
					currentstate = 'asc';
				} else if(currentstate === 'asc') {
					//Sort to desc
					setCaret('up');
					sortArray('up');
					currentstate = 'desc';
				} 
			});	
			
			element.css('cursor', 'pointer');
			
			//#endregion Private functions
			
			}
		};
	}]);
})();
(function() {
    'use strict';
	app.directive('customtable', ['$rootScope', function($rootScope) {
		return {
			restrict: 'AE',
			templateUrl: 'directives/tables/table.template.html',
			scope: {
				data: '=',
				headers: '=',
				properties: '=',
				icon: '=',
				title: '=',
				actions: '='
            },
			link: function(scope, element, attrs)  {
				console.log('table directive');
				
				$('#limitselection').click(function(e){
					e.stopPropagation()
				});
				
				scope.filtereddata = [];
				scope.pages = [];
				scope.currentpage = 1;
				scope.limit = "10";
				
				var initializeDirective = function () {
					console.log('table directive.initializeDirective : Initialize the table directive.');
				};
				
				scope.anySelected = function(){
					var result = false;
					if(angular.isDefined(scope.data) && angular.isArray(scope.data) && scope.data.length > 0) {
						result = Enumerable.from(scope.data).any(function(t){ return t.selected === true; });
					}
					return result;
				};
				
				scope.displayPageCommand = function(pageindex){
					if(pageindex > 0 && pageindex <= scope.pages) {
						scope.currentpage = pageindex;
						var startindex = parseInt(scope.limit) * (pageindex - 1);
						scope.filtereddata = scope.data.slice(startindex, startindex + parseInt(scope.limit));
					}
				};
				
				var onLimitChanged = scope.$watch('limit', function (newvalue, oldvalue) {
					console.log('table received onLimitChanged');
					if(angular.isDefined(newvalue) && oldvalue != newvalue) {
						scope.currentpage = 1;
						scope.filtereddata = Enumerable.from(scope.data).take(parseInt(scope.limit)).toArray();
						scope.pages = Math.ceil(scope.data.length / parseInt(scope.limit));
					}
				});
				
				var onDataChanged = scope.$watch('data', function (newvalue, oldvalue) {
					console.log('table directive received onDataChanged');
					if(angular.isDefined(newvalue) && angular.isArray(newvalue)){
						scope.data = newvalue;
						if(newvalue.length > 0){
							scope.filtereddata = Enumerable.from(newvalue).take(parseInt(scope.limit)).toArray();
							scope.pages = Math.ceil(newvalue.length / parseInt(scope.limit));
							var lastupdated = Enumerable.from(newvalue).orderBy("$.ModificationDate").first();
							scope.lastupdate = moment(lastupdated.ModificationDate.date).format('D/MM/YYYY HH:mm:ss');
						}
					}
				});

				var onViewContentLoaded = scope.$watch('$viewContentLoaded', function () {
					console.log('table directive received $viewContentLoaded');
					initializeDirective();
				});
				
				var destroyOn = scope.$on('$destroy', function destroyDirective() {
					console.log('table directive destroy.');
					destroyOn();
					onViewContentLoaded();
					onDataChanged();
					onLimitChanged();
				});
			}
		};
	}]);
})();
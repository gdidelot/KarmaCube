(function (angular) {
    'use strict';

    /**
    * Directive to display advanced filters form.
    */
    app.directive("advancedFilters", ['$injector', function ($injector) {
        var uuid = 0;
        var $rootScope = $injector.get("$rootScope");
        var $document = $injector.get("$document");
        var $filter = $injector.get("$filter");
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl;
            },
            scope: {
				global: '=',
                list: '=',
                filterName: '=',
                filters: '='
            },
            link: function (scope, element) {
                //#region Variables declarations
				var globalList = undefined;
				var originalList = undefined;
                scope.componentId = uuid++;
                scope.isPopupVisible = false;
				scope.selectedfilters = [];
                console.info("Advanced filters directive " + scope.filterName + " instantiate with id " + scope.componentId.toString() + " .");
                //#endregion Variables declarations

                //#region Private methods
                /**
                 * Toggle popup view.
                 */
                var onClickDocument = function (event) {
                    var isClickedElementChildOfPopup = element.find(event.target).length > 0;

                    if (!isClickedElementChildOfPopup && scope.isPopupVisible) {
                        scope.isPopupVisible = false;

                        if (!scope.$$phase && (scope.$root && !scope.$root.$$phase)) {
                            scope.$digest();
                        }
                    }
                };
				
				var applyFilters = function() {
					var temp = globalList;
					angular.forEach(scope.selectedfilters, function(filter) {
						if(angular.isDefinedAndNotNull(filter.request)) {
							temp = Enumerable.from(temp).intersect(Enumerable.from(globalList).where(filter.request).toArray()).toArray();
						}
					});
					
					scope.list = (scope.selectedfilters.length > 0) ? temp : originalList;
				};

                /**
                 * Initialize component.
                 */
                var initComponent = function () {
  
                };

                //#endregion Private methods

                //#region Public methods
                /**
                * Toggle show filters.
                */
                scope.toggleShowFilterCommand = function () {
                    scope.isPopupVisible = !scope.isPopupVisible;
                };

                /** 
                 * Reset filter command.
                 *  
                 * @param filter string The filter name to remove.
                 */
                scope.resetFilterCommand = function (event, filter) {
                    if (angular.isDefinedAndNotNull(event)) {
                        event.stopPropagation();
                    }
					
					var anyfilter = Enumerable.from(scope.filters).any(function(f){ return f.value.filterName === filter.filterName; });
					
                    if (anyfilter) {
						filter.request = undefined;
						filter.selected = false;
                        var index = scope.selectedfilters.indexOf(filter);
						if(index > -1) {
							scope.selectedfilters.splice(index, 1);
						}
						filter.value = filter.defaultvalue;
						
						applyFilters();
                    }
                };
				
				scope.checkInputTextValue = function(filter) {
					filter.selected = (filter.value === null || filter.value === undefined || filter.value === '') ? false : true;
					var index = undefined;
					if(filter.selected === true) {
						var exist = Enumerable.from(scope.selectedfilters).any(function(f){ return f == filter; });
						if(angular.isDefinedAndNotNull(filter.field)){
							filter.request = function(i){ return (i[filter.field].toLowerCase().indexOf(filter.value.toLowerCase()) !== -1); };
							if(exist === false) {
								scope.selectedfilters.push(filter);
							} else {
								index = scope.selectedfilters.indexOf(filter);
								if(index > -1) {
									scope.selectedfilters.splice(index, 1);
									scope.selectedfilters.splice(index, 0, filter);
								}
							}
						} else if(angular.isDefinedAndNotNull(filter.fields)) {
							exist = Enumerable.from(scope.selectedfilters).any(function(f){ return f === filter; });
							if(filter.fields.length === 3) {
								filter.request = function(i){ return (i[filter.fields[0]] !== null ? i[filter.fields[0]].toString().toLowerCase().indexOf(filter.value.toString().toLowerCase()) !== -1 : null) || (i[filter.fields[1]] !== null ? i[filter.fields[1]].toString().toLowerCase().indexOf(filter.value.toString().toLowerCase()) !== -1 : null) || (i[filter.fields[2]] !== null ? i[filter.fields[2]].toString().toLowerCase().indexOf(filter.value.toString().toLowerCase()) !== -1 : null); };
								if(exist === false) {
									scope.selectedfilters.push(filter);
								} else {
									index = scope.selectedfilters.indexOf(filter);
									if(index > -1) {
										scope.selectedfilters.splice(index, 1);
										scope.selectedfilters.splice(index, 0, filter);
									}
								}
							}
						}
					} else {
						index = scope.selectedfilters.indexOf(filter);
						if(index > -1) {
							scope.selectedfilters.splice(index, 1);
						}
						filter.request = undefined;
						filter.selected = false;
					}
					applyFilters();
				};
				
				scope.checkInputChoiceValue = function(filter) {
					filter.selected = (filter.value === -1) ? false : true;
					var index = undefined;
					if(filter.selected === true) {
						var exist = Enumerable.from(scope.selectedfilters).any(function(f){ return f == filter; });
						filter.request = function(i){ return i[filter.field] == filter.value; };
						if(exist === false) {
							scope.selectedfilters.push(filter);
						} else {
							index = scope.selectedfilters.indexOf(filter);
							if(index > -1) {
								scope.selectedfilters.splice(index, 1);
								scope.selectedfilters.splice(index, 0, filter);
							}
						}
					} else {
						index = scope.selectedfilters.indexOf(filter);
						if(index > -1) {
							scope.selectedfilters.splice(index, 1);
						}
						filter.request = undefined;
						filter.selected = false;
					}
					applyFilters();
				};
				
				scope.checkInputDateValue = function(filter){
					var valuestart = filter.valuestart.operationDateYear + '-' + filter.valuestart.operationDateMonth + '-' + filter.valuestart.operationDateDay;
					var valueend = filter.valueend.operationDateYear + '-' + filter.valueend.operationDateMonth + '-' + filter.valueend.operationDateDay;
					var index = undefined;
					
					filter.selected = ((filter.valuestart === filter.defaultvaluestart) ? false : true) && ((filter.valueend === filter.defaultvalueend) ? false : true);
					
					if(filter.selected === true) {
						var exist = Enumerable.from(scope.selectedfilters).any(function(f){ return f == filter; });
						filter.request = function(i){ return moment(i[filter.field].date) >= moment(valuestart) && moment(i[filter.field].date) <= moment(valueend); };
						if(exist === false) {
							scope.selectedfilters.push(filter);
						} else {
							index = scope.selectedfilters.indexOf(filter);
							if(index > -1) {
								scope.selectedfilters.splice(index, 1);
								scope.selectedfilters.splice(index, 0, filter);
							}
						}
					} else {
						index = scope.selectedfilters.indexOf(filter);
						if(index > -1) {
							scope.selectedfilters.splice(index, 1);
						}
						filter.request = undefined;
						filter.selected = false;
					}
					applyFilters();
				};
				
                //#endregion Public methods

                //#region Events management
                $document.on('click', onClickDocument);

                var watcherFilters = scope.$watch("filters", function () {
                    applyFilters();
                }, true);

                var watcherListCollection = scope.$watchCollection("list", function () {
					var anyfilter = Enumerable.from(scope.filters).any(function(f){ return f.value.selected === true; });
                    if (angular.isArray(scope.list) && anyfilter === false) {
						originalList = scope.list;
                        angular.forEach(scope.filters, function (filter) {
                            scope.resetFilterCommand(undefined, filter.filterName);
                        });
                    }
                });
				
				var watcherGlobalCollection = scope.$watchCollection("global", function () {
					var anyfilter = Enumerable.from(scope.filters).any(function(f){ return f.value.selected === true; });
                    if (angular.isArray(scope.global) && anyfilter === false) {
						globalList = scope.global;
                        angular.forEach(scope.filters, function (filter) {
                            scope.resetFilterCommand(undefined, filter.filterName);
                        });
                    }
                });

                var destroyOn = scope.$on("$destroy", function handleDestroyEvent() {
                    console.info("Advanced filters directive " + scope.filterName + " destroy with id " + scope.componentId.toString() + " .");
                    destroyOn();
                    watcherFilters();
                    watcherListCollection();
                    watcherGlobalCollection();
                    $document.off('click', '', onClickDocument);
                });
                //#endregion Events management

                initComponent();
            }
        };
    }]);
})(window.angular);
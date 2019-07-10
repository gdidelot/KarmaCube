(function (angular, moment) {
    'use strict';

	app.filter('malezhiveDate', ["$filter", function($filter) {    
		var angularDateFilter = $filter('date');
		return function(theDate) {
		   return moment(theDate).format("DD/MM/YYYY H:mm:ss");
		};
	}]);
	
	app.filter('malezhiveDateOnly', ["$filter", function($filter) {    
		var angularDateFilter = $filter('date');
		return function(theDate) {
		   return moment(theDate).format("DD/MM/YYYY");
		};
	}]);
	
	app.filter('malezhiveDayNumberOnly', ["$filter", function($filter) {    
		var angularDateFilter = $filter('date');
		return function(theDate) {
		   return moment(theDate).format("DD");
		};
	}]);
	
	app.filter('malezhiveMonthNameOnly', ["$filter", function($filter) {    
		var angularDateFilter = $filter('date');
		return function(theDate) {
		   return moment(theDate).format("MMMM");
		};
	}]);

})(window.angular, window.moment);
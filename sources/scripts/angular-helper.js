
function UnitOfWork(array, callback, startcallback, progresscallback, completecallback){
	var self = this;
	self.array = array;
	self.callback = callback;
	self.startcallback = startcallback;
	self.progresscallback = progresscallback;
	self.completecallback = completecallback;
	self.currentindex = 0;
	
	self.process = function(item) {
		self.callback(item, function() {
			if(angular.isDefined(self.progresscallback) && angular.isFunction(self.progresscallback)) {
				self.progresscallback(((self.currentindex + 1) * 100 / (self.array.length - 1)).toFixed(0));
			}
			
			if(self.currentindex <= self.array.length - 1) {
				if(self.currentindex === self.array.length - 1 && angular.isDefined(self.completecallback) && angular.isFunction(self.completecallback)) {
					self.completecallback();
				} else {
					self.currentindex++;
					var item = self.array[self.currentindex];
					self.process(item);
				}
			}
		});
	};
	
   return {
		execute: function() {
			if(angular.isDefined(self.array) && angular.isArray(self.array) && self.array.length > 0) {
				if(angular.isDefined(self.startcallback) && angular.isFunction(self.startcallback)) {
					self.startcallback();
				}
				var item = self.array[self.currentindex];
				self.process(item);
			} else {
				console.log('angular.executeUnitOfWork.execute : failed');
				console.log('angular.executeUnitOfWork.execute : array ' + JSON.stringify(self.array));
			}
		}
	};
}

(function (angular) {
    'use strict';

    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null;
    };

    angular.isDefinedAndNotNull = function (val) {
        return angular.isDefined(val) && val !== null;
    };
	
	angular.guid = function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};

})(window.angular);
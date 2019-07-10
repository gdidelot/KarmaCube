Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};

function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function UnitOfWork(array, callback, startcallback, progresscallback, completecallback, interval){
	var self = this;
	self.array = array;
	self.callback = callback;
	self.startcallback = startcallback;
	self.progresscallback = progresscallback;
	self.completecallback = completecallback;
	self.currentindex = 0;
	self.interval = interval;
	
	self.process = function(item) {
		
		if(self.interval !== undefined && Number.isInteger(self.interval)) {
			setTimeout(function(){
				self.callback(item, function() {
					if(self.progresscallback !== undefined && isFunction(self.progresscallback)) {
						self.progresscallback(((self.currentindex + 1) * 100 / (self.array.length - 1)).toFixed(0));
					}
					
					if(self.currentindex <= self.array.length - 1) {
						if(self.currentindex === self.array.length - 1 && self.completecallback !== undefined && isFunction(self.completecallback)) {
							self.completecallback();
							console.log('UnitOfWork.executeUnitOfWork.execute : finished');
						} else if(self.currentindex === self.array.length - 1) {
							console.log('UnitOfWork.executeUnitOfWork.execute : finished');
						} else {
							self.currentindex++;
							var item = self.array[self.currentindex];
							self.process(item);
						}
					}
				});
			}, self.interval);
		} else {
			self.callback(item, function() {
				if(self.progresscallback !== undefined && isFunction(self.progresscallback)) {
					self.progresscallback(((self.currentindex + 1) * 100 / (self.array.length - 1)).toFixed(0));
				}
				
				if(self.currentindex <= self.array.length - 1) {
					if(self.currentindex === self.array.length - 1 && self.completecallback !== undefined && isFunction(self.completecallback)) {
						self.completecallback();
					} else {
						self.currentindex++;
						var item = self.array[self.currentindex];
						self.process(item);
					}
				}
			});
		}
	};
	
   return {
		execute: function() {
			if(self.array !== undefined && Array.isArray(self.array) && self.array.length > 0) {
				if(self.startcallback !== undefined && isFunction(self.startcallback)) {
					self.startcallback();
				}
				var item = self.array[self.currentindex];
				self.process(item);
			} else {
				if(isFunction(self.completecallback)) {
						self.completecallback();
						console.log('UnitOfWork.executeUnitOfWork.execute : finished');
				} else {
					console.log('UnitOfWork.executeUnitOfWork.execute : failed');
					console.log('UnitOfWork.executeUnitOfWork.execute : array ' + JSON.stringify(self.array));
					
				}
			}
		}
	};
}
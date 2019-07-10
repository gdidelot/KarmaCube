(function (angular) {
    'use strict';
	
    Array.prototype.removeValue = function(value) {
        if (value !== 'undefined' && value !== null) {
            var index = this.indexOf(value);
            if (index !== -1) {
                return this.splice(index, 1); // The second parameter is the number of elements to remove.
            }
        }

        return null;
    };
	
    Array.prototype.remove = function(keyName, keyValue, ignoreCase) {
        var valueToRemove = Enumerable.from(this).firstOrDefault(function (current) {
            if (ignoreCase && typeof current[keyName] === 'string' && typeof keyValue === 'string') {
                return current[keyName].toUpperCase() === keyValue.toUpperCase();
            } else {
                return current[keyName] === keyValue;
            }
        }, null);

        return this.removeValue(valueToRemove);
    };

    Array.prototype.addOrReplaceElement = function(keyName, element) {
        var existingItem = Enumerable.from(this).firstOrDefault(function (current) {
            return current[keyName] === element[keyName];
        }, null);

        if (existingItem !== null) {
            var index = this.indexOf(existingItem);
            this[index] = element;
        } else {
            this.push(element);
        }
    };

    Array.prototype.symetricExcept = function(other, keyName) {
        var result = [];
        if (angular.isDefinedAndNotNull(other) && angular.isArray(other)) {
            var added = Enumerable.from(other).except(this, "$." + keyName).toArray();
            var removed = Enumerable.from(this).except(other, "$." + keyName).toArray();
            result = added.concat(removed);
        }
        return result;
    };
	
})(window.angular);
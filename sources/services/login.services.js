(function (angular) {
    'use strict';
	
    app.factory("loginservices", ["$rootScope", "$injector", "$interval", function($rootScope, $injector, $interval) {
	    console.info("start to register login services");
	
	    var toolsservices = $injector.get('toolsservices');
	    var userservices = $injector.get('userservices');
		var modalservice = $injector.get('ModalService');
	    var gettextCatalog = $injector.get('gettextCatalog');
	    var islocked = false;
		
	    var verifyAccount = function (callback, mail, password) {
	        userservices.verifyAccount(mail, password)
	        .then(function (verifyAccountResult) {
	            callback(verifyAccountResult);
	        })
	        .catch(function (error) {
	        });
	    };
		
		var setUserAsOnline = function (user) {
			userservices.setUserAsOnline(function (data) {
				console.debug('userservices setUserAsOnline received');
			}, user); 
	    };
	
	    var onLockApplicationRequired = $rootScope.$on('lockApplicationRequired', function() { 
	        if(islocked === false && angular.isDefined($rootScope.currentuser)) {
			    islocked = true;
				$rootScope.logout();
		    }
	    });
	
	    var onUnlockApplicationRequired = $rootScope.$on('unlockApplicationRequired', function() { 
		    if(window.angular.isDefined($rootScope.sessionTimeOut)) {
			    $interval.cancel($rootScope.sessionTimeOut);
			    $rootScope.sessionTimeOut = undefined;
		    }
			islocked = false;
	    });

	    return {
	        checkAccount: function (callback, mail, password) {
	            verifyAccount(function (result) {
	                callback(result);
	            }, mail, password);
	        },
		    checkLoggedUser: function(callback) {
			    console.log('loginservices - initialize service');
			    var user = toolsservices.getCurrentUser();
			    if (user === undefined) {
				     $rootScope.changeLocation('login');
			    } else {
				    $rootScope.currentuser = user;
					setUserAsOnline(user);
				    callback(user);
			    }
		    }
	    };
    }]);
}(window.angular));
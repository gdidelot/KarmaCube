/**
* Define the main application module
*/
var app = angular.module('karmacube', ['ngRoute', 'gettext', 'ngResource', 'uiSwitch', 'angularModalService', 'ngIdle', 'ngCookies', '720kb.tooltips', 'treeControl', 'angular-tour'], function () {
	
});

(function (angular, enumerable, toastr) {
    "use strict";

	/**
	* Define the root scope for each controller onn the application
	* 
	* Need to manage translations and current user
	*/
	app.run(["$injector", "$location", "gettextCatalog", "Idle", function ($injector, $location, gettextCatalog, Idle) {

		//#region Variables declarations
		var $window = $injector.get('$window');
		var $rootScope = $injector.get('$rootScope');
		var $compile = $injector.get('$compile');
		var $timeout = $injector.get('$timeout');
		var $route = $injector.get('$route');
		var $http = $injector.get('$http');
		var $cookies = $injector.get('$cookies');
		var requestservices = $injector.get('requestservices');
		var userservices = $injector.get('userservices');
		var modalservice = $injector.get('ModalService');
		var karmaCubeCookies = $cookies.getObject('malesherbunis-language-parameters');

		if(angular.isDefined(karmaCubeCookies)) {
			$rootScope.defaultCulture = karmaCubeCookies;
			gettextCatalog.setCurrentLanguage(karmaCubeCookies);
		}
		
		$rootScope.isFullScreen = false;
		
		$.ajax({
			type: 'GET',
			url: 'parametres.json',
			dataType: 'json',
			success: function (response) {
				console.log('app.mainInfo : configuration file loaded');
				$rootScope.version = response.version;
				$rootScope.config = response;
				app.servicebase = response.servicebase;
				gettextCatalog.debug = ($rootScope.config.isDebug === 1) ? true : false;
				if(angular.isDefined(karmaCubeCookies)) {
					$rootScope.defaultCulture = karmaCubeCookies;
					gettextCatalog.setCurrentLanguage(karmaCubeCookies);
					$rootScope.selectedlanguage = Enumerable.from($rootScope.config.availableLanguages).firstOrDefault(function(l){  return l.tag === karmaCubeCookies;});
				} else {
					var today = new Date();
					var expiresValue = new Date(today);
					expiresValue.setDate(today.getDate() + 7);
					$cookies.putObject('malesherbunis-language-parameters',  response.defaultCulture,  {'expires' : expiresValue});
					$rootScope.defaultCulture = response.defaultCulture;
					gettextCatalog.setCurrentLanguage($rootScope.defaultCulture);
					$rootScope.selectedlanguage = Enumerable.from($rootScope.config.availableLanguages).firstOrDefault(function(l){  return l.tag === $rootScope.defaultCulture;});
				}
				moment.locale($rootScope.defaultCulture.split('-')[0]);
				$rootScope.$broadcast('configurationLoaded');
			},
			error: function(error){
				console.log(error);
			},
			data: {},
			async: false
		});
		
		$.ajax({
			type: 'GET',
			url: 'nouveautes.json',
			dataType: 'json',
			success: function (response) {
				console.log('app.mainInfo : fichier des nouveautés chargé');
				$rootScope.nouveautes = response;
			},
			error: function(error){
				console.log(error);
			},
			data: {},
			async: false
		});

		Idle.watch();

		//#endregion Variables declarations 
		
		//#region Private functions
		
		var mobilecheck = function() {
			var check = false;
			  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		};
		
		//#endregion Private functions
		
		//#region Public functions
		
		$rootScope.toggleFullScreenCommand = function(){
			if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
				if (document.documentElement.requestFullScreen) {  
					document.documentElement.requestFullScreen();  
				} else if (document.documentElement.mozRequestFullScreen) {  
					document.documentElement.mozRequestFullScreen();  
				} else if (document.documentElement.webkitRequestFullScreen) {  
					document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
				} 
				$rootScope.isFullScreen = true;
			} else {  
				if (document.cancelFullScreen) {  
					document.cancelFullScreen();  
				} else if (document.mozCancelFullScreen) {  
					document.mozCancelFullScreen();  
				} else if (document.webkitCancelFullScreen) {  
					document.webkitCancelFullScreen();  
				}
				$rootScope.isFullScreen = false;
			}  
		};
		
		$rootScope.changeLanguageCommand = function(language) {
			var today = new Date();
			var expiresValue = new Date(today);
			expiresValue.setDate(today.getDate() + 7);
			$cookies.putObject('malesherbunis-language-parameters',  language.tag,  {'expires' : expiresValue});
			$rootScope.defaultCulture = language.tag;
			gettextCatalog.setCurrentLanguage($rootScope.defaultCulture);
		};
		
		$rootScope.changeLocation = function(url, forceReload) {
			$rootScope = $rootScope || angular.element(document).scope();
			if((angular.isDefined(forceReload) && forceReload === true) || $rootScope.$$phase) {
				var currenturl = $location.absUrl();
				var urlarray = currenturl.split('/');
				urlarray[urlarray.length - 1] = url;
				window.location = urlarray.join('/');
			}
			else {
				$location.path(url);
				$rootScope.$apply();
			}
		};

		$rootScope.notify = function(message, type) {
			console.log("app.notify : " + message + " / " + type);
			toastr[type](message);
		};
		
		$rootScope.logout = function(){
			console.log('app LogoutRequested received');
			
			$('.modal').remove();
			$('.modal-backdrop').remove();
			$('body').removeClass("modal-open");		
			
			userservices.logout(function (data) {
				console.debug('userservices logout received');
				if(data.isFailed) {
					$rootScope.notify(gettextCatalog.getString(data.exception), 'warning');
				}
				else {
					$rootScope.notify(gettextCatalog.getString('User_Logouted'), 'success');
				}
				
				$rootScope.currentuser = undefined;
				localStorage.removeItem('currentuser');
				$rootScope.changeLocation('login');
				
			}, $rootScope.currentuser);
		};
		
		$rootScope.openCGUCGVCommand = function(){
			$rootScope.changeLocation('cgucgv');
		};
		
		
		var paramversionsvalue = $location.search().versions; 
		if(paramversionsvalue === "1"){
			$rootScope.changeLocation('versions');
		}
		$rootScope.issmartphone = mobilecheck();
		
		//#endregion Public functions

		//#region Events management
		
		$rootScope.$on('IdleStart', function() {
			console.log('app.IdleStart : Event received');
			$rootScope.$broadcast('lockApplicationRequired'); 
		});

		$rootScope.$on('IdleEnd', function() {
			console.log('app.IdleEnd : Event received');
			$rootScope.$broadcast('unlockApplicationRequired'); 
		});
		
		$rootScope.$on("$routeChangeError", function () {
			console.log("failed to change routes");
		});
		
		$rootScope.$on("$routeChangeSuccess", function () {
			console.log("success to change routes");
			requestservices.cancelAll();
		});

		var destroyOn = $rootScope.$on("$destroy", function destroyContactController() {
			console.log("app destroy.");
			destroyOn();
		});
		
		//#endregion Events management

	}]);

})(window.angular, window.Enumerable, window.toastr);
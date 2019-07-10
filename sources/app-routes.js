(function () {
    "use strict";
	app.config(['$routeProvider', '$provide', function($routeProvider, $provide) {
		
		console.info('Start to configure route provider');
		
		$routeProvider.
		when('/', 
		{
			templateUrl: 'composants/accueil.view.html',
			controller: 'accueilcontroller'
		}).
		when('/accueil', 
		{
			templateUrl: 'composants/accueil.view.html',
			controller: 'accueilcontroller'
		}).
		when('/login', 
		{
			templateUrl: 'composants/login.view.html',
			controller: 'logincontroleur'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);
})();
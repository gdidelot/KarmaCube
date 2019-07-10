/**
* Configure the application
*/
app.config(['$provide', '$httpProvider', '$compileProvider', '$injector', 'IdleProvider', 'KeepaliveProvider', 'tooltipsConfProvider', function ($provide, $httpProvider, $compileProvider, $injector, IdleProvider, KeepaliveProvider, tooltipsConfProvider) {
    
	console.info('Start to configure application');
	
	$compileProvider.debugInfoEnabled(false);
	 
	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};
	
	IdleProvider.idle(300);
	IdleProvider.timeout(0);
	
	console.info('Configuration file was loaded');
		
	toastr.options.closeMethod = 'fadeOut';
	toastr.options.closeDuration = 300;
	toastr.options.closeEasing = 'swing';
	toastr.options.progressBar = true;
	toastr.options.positionClass = "toast-top-full-width";
	
	 tooltipsConfProvider.configure({
		'smart': true,
		'size': 'large',
		'speed': 'slow',
		'tooltipTemplateUrlCache': true
	  });
	
	console.info('Application configuration is finished');

}]);

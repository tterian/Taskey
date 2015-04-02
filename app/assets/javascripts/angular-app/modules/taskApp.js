var taskApp = angular.module('taskApp', [
	'ngAnimate',
	'ngResource',
	'ngRoute',
	'ngMaterial',
	'ngMdIcons',
	'ngAria',
	'appServices',
	'appControllers'
	]);

taskApp.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {
	$routeProvider
		.when('/', {
			controller: 'TaskController',
			templateUrl: 'assets/angular-app/templates/browse.html.erb'
		})
		.when('/post', {
			controller: 'TaskController',
			templateUrl: 'assets/angular-app/templates/post.html.erb'
		})
		.when('/edit/:taskId', {
			controller: 'UpdateController',
			templateUrl: 'assets/angular-app/templates/edit.html.erb'
		})
		.when('/browse', {
			controller: 'TaskController',
			templateUrl: 'assets/angular-app/templates/browse.html.erb'
		})
		.otherwise({redirectTo: '/'
		});

}]);
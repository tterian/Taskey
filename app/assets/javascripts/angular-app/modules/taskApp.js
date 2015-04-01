var taskApp = angular.module('taskApp', [
	'ngAnimate',
	'ngResource',
	'ngRoute',
	'ngMaterial',
	'ngAria',
	'appServices',
	'appControllers'
	]);

taskApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
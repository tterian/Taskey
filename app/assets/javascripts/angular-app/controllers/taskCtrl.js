var appControllers = angular.module('appControllers', []);

appControllers.controller('TaskController', ['$scope', '$location', 'Task', function($scope, $location, Task) {
	$scope.tasks = Task.query();

	$scope.postTask = function(task) {
		var task = new Task(task);
		task.$save(function() {
			$scope.tasks.unshift(task);
			$location.path('/browse');
		});
	}
}]);


appControllers.controller('UpdateController', ['$scope', '$location', '$routeParams', 'Task', function($scope, $location, $routeParams, Task) {
	$scope.selectedTask = Task.get({id: $routeParams.taskId});

	$scope.updateTask = function(task) {
		task.$update(function() {
			$location.path('/browse');
		});
	}
}]);

	


appControllers.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log) {

});


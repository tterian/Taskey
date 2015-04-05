var appControllers = angular.module('appControllers', []);

appControllers.controller('TaskController', ['$scope', '$location', '$mdDialog', '$mdBottomSheet', 'Task', function($scope, $location, $mdDialog, $mdBottomSheet, Task) {
	//Get all the task records from the Task service
	$scope.tasks = Task.query();
	$scope.updatedAt = '-updated_at'

	//Invoke a modal dialog and add a post from the dialog
	$scope.addTask = function(ev) {
		$mdDialog.show({
			controller: 'PostDialogController',
			templateUrl: 'assets/angular-app/templates/post.html.erb',
			targetEvent: ev
		})
		.then(function(answer) {
			var task = new Task(answer);
			task.$save(function() {
				$scope.tasks.unshift(task);
			});
		});
	};

	//Invoke a modal dialog and edit a post from the dialog
	$scope.editTask = function(task) {
		$scope.currentTask = Task.get({id: task.id});

		$mdDialog.show({
			controller: 'EditDialogController',
			templateUrl: 'assets/angular-app/templates/edit.html.erb',
        	locals: {
           		currentTask: $scope.currentTask
         	}			
		}).then(function(answer) {
			answer.$update(function() {
				$location.path('#/browse');
			});
		});
	};

	//Bottom sheet controller
	$scope.showListBottomSheet = function(ev) {
		$mdBottomSheet.show({
		controller: 'UserController',
		templateUrl: 'assets/angular-app/templates/bottom-sheet.html.erb',
		targetEvent: ev
		});
	};


}]);


//Users controller
appControllers.controller('UserController', ['$scope', '$location', '$mdBottomSheet', '$mdDialog', 'Auth', function($scope, $location, $mdBottomSheet, $mdDialog, Auth) {	
	$scope.user = { 
		email: '',
		password: ''
	};

	$scope.userLogIn = function(ev) {
		$mdBottomSheet.hide()
		$mdDialog.show({
			controller: 'DialogController',
			templateUrl: 'assets/angular-app/templates/sign-in.html.erb',
			targetEvent: ev
		})
		.then(function(answer) {
			console.log(Auth.isAuthenticated());
			Auth.login(answer).then(function() {
				console.log(Auth.isAuthenticated());
				console.log(answer);
				$mdDialog.hide();
			}, function(error) {
				console.log(Auth.isAuthenticated());
				$mdDialog.cancel();
				console.info('Error in signing in');				
			});
		});
	};

	$scope.userLogOut = function(ev) {

	};


}]);



//Controller for post dialog
appControllers.controller('PostDialogController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}]);


//Controller for edit dialog
appControllers.controller('EditDialogController', ['$scope', '$mdDialog', 'currentTask', function($scope, $mdDialog, currentTask) {
	$scope.currentTask = currentTask;
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}]);
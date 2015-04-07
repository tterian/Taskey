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
			var task = new Task(
				{
					title: answer.title,
					description: answer.description,
					total: answer.total,
					user_id: $scope.user.id
				});
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
appControllers.controller('UserController', ['$scope', '$location', '$mdBottomSheet', '$mdDialog', '$mdToast', '$auth', function($scope, $location, $mdBottomSheet, $mdDialog, $mdToast, $auth) {	

	$scope.userLogIn = function(ev) {
		$mdBottomSheet.hide()
		$mdDialog.show({
			controller: 'UserDialogController',
			templateUrl: 'assets/angular-app/templates/user-sessions/new.html.erb',
			targetEvent: ev
		})
		.then(function(answer) {
			$auth.submitLogin({
				email: answer.email,
				password: answer.password
			});
			$mdToast.show(
				$mdToast.simple()
					.content('Yay ' + answer.email + ' ,you have successfully logged in')
					.position("bottom right")
					.hideDelay(3000)
			);
		});
	};

	$scope.userRegister = function(ev) {
		$mdBottomSheet.hide()
		$mdDialog.show({
			controller: 'UserDialogController',
			templateUrl: 'assets/angular-app/templates/user-registrations/new.html.erb',
			targetEvent: ev
		})
		.then(function(answer) {
			$auth.submitRegistration({
				email: answer.email,
				password: answer.password
			});
			$mdToast.show(
				$mdToast.simple()
					.content('Thank you for coming in!')
					.position("bottom right")
					.hideDelay(3000)
			);
		});
	};

	$scope.userLogOut = function(ev) {
		$mdBottomSheet.hide()
		$auth.signOut()
			.then(function() {
			$mdToast.show(
				$mdToast.simple()
					.content('See you later!')
					.position("bottom right")
					.hideDelay(3000)
			);
		}, function(reason) {
			$mdToast.show(
				$mdToast.simple()
					.content("No way! " + reason.errors[0])
					.position("bottom right")
					.hideDelay(3000)
			);
		});
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


//Controller for login dialog
appControllers.controller('UserDialogController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
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
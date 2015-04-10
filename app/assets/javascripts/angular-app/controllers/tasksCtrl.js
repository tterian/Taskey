function TasksController($scope, $location, Task, User, Sheet, Dialog, Toast) {

	$scope.tasks = Task.all;
	$scope.updatedAt = '-updated_at'
	$scope.currentUser = User.currentUser;


	$scope.createTask = function(task) {
		Task.createTask(task)
			.then(function() {
				$scope.tasks.unshift(task);
				Dialog.hide();
				Toast.pop('Yay, you have successfully added a task');
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0]);
			});
	};


	$scope.editTask = function(taskId) {
		console.log(Task.getTask(taskId));
	};




	$scope.showModal = function(task) {
		Dialog.addTask(task);
	}

	
	$scope.showBottomSheet = function(ev) {
		Sheet.show(ev);
	}

};
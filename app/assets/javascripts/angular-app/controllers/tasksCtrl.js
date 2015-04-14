function TasksController($scope, $location, Task, User, Sheet, Dialog, Toast) {

	$scope.tasks = Task.all;
	$scope.updatedAt = '-updated_at';
	$scope.currentUser = User.currentUser;
//	$scope.currentTask = '';

	
	$scope.createTask = function(task) {
		var extendedTask = {
			title: task.title,
			status: 'open',
			description: task.description,
			poster: $scope.currentUser.email,
			total: task.total
		};

		Task.createTask(task)
			.then(function() {		
				$scope.tasks.push(extendedTask);
				Dialog.hide();
				Toast.pop('Yay, you have successfully added a task');
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0]);
			});
	};


	$scope.getTask = function(task) {
		$scope.currentTask = task;
	};


	$scope.showModal = function(task) {
		Dialog.addTask(task);
	};

	
	$scope.showBottomSheet = function(ev) {
		Sheet.show(ev);
	};

};
function TasksController($scope, $location, Task, User, Sheet, Dialog, Toast) {

	$scope.tasks = Task.all;
	$scope.updatedAt = '-updated_at';
	$scope.currentUser = User.currentUser;
//	$scope.currentTask = '';
	$scope.isCreator = 'false';

	
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
//		$scope.currentTask = Task.getTask(task.id);
		$scope.currentTask = task;
		$scope.isCreator = Task.isCreator(task);
//		console.log(Task.getTask(task.id));
	};


	$scope.cancelTask = function(taskId) {
		Task.cancelTask(taskId);
	};






















	$scope.showModal = function(task) {
		Dialog.addTask(task);
	};

	
	$scope.showBottomSheet = function() {
		Sheet.show();
	};



	$scope.showModalLogin = function() {
		Dialog.userLogin();
		Sheet.hide();
	};

	$scope.showModalRegister = function() {
		Dialog.userRegister();
		Sheet.hide();
	};





};
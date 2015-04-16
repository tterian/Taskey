function TasksController($scope, $location, $mdDialog, Task, User, Sheet, Toast) {

	$scope.tasks = Task.all;
	$scope.updatedAt = '-updated_at';
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
		$mdDialog.show({
			controller: 'TasksController',
			templateUrl: 'assets/angular-app/templates/partials/post.html.erb',
			targetEvent: ev
		});
	};

	
	$scope.showBottomSheet = function() {
		Sheet.show();
	};


	$scope.showModalLogin = function(ev) {
		$mdDialog.show({
			controller: 'DialogController',
			templateUrl: 'assets/angular-app/templates/user-sessions/new.html.erb',
			targetEvent: ev,
		})
		.then(function(answer) {
			User.userLogin(answer)
				.then(function() {
					Toast.pop('Yay, you have successfully logged in');
					$mdDialog.hide();
				}, function(reason) {
					Toast.pop('No way, ' + reason.errors[0])
					$mdDialog.hide();
				});
		});
		Sheet.hide();
	};

	$scope.showModalRegister = function(ev) {
		$mdDialog.show({
			controller: 'DialogController',
			templateUrl: 'assets/angular-app/templates/user-registrations/new.html.erb',
			targetEvent: ev,
		})
		.then(function(answer) {
			User.userRegister(answer);
			User.userLogin(answer)
				.then(function() {
					Toast.pop('Thank you for coming in!');
					$mdDialog.hide();
				}, function(reason) {
					Toast.pop('No way, ' + reason.errors[0])
					$mdDialog.hide();
				});
		});
		Sheet.hide();
	};

	$scope.userLogOut = function() {
		User.userLogOut()
			.then(function() {
				Toast.pop('See you later!');
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
			});
		Sheet.hide();
	};


};
function TasksController($scope, $location, $mdDialog, Task, User, Sheet, Toast) {

	$scope.tasks = Task.all;
	$scope.updatedAt = '-updated_at';
	$scope.currentTask = '';
	$scope.isCreator = 'false';
	$scope.currentUser = User.currentUser;

	var id = User.currentUser.id % 11 + 1;
	var avatars = ["actor", "agent", "anonymous", "astronaut", "basketball", "bomberman", "dead", "engineering1", "engineering2", "maid", "matrix"];

	$scope.createTask = function(task) {
		var extendedTask = {
			title: task.title,
			status: 'open',
			description: task.description,
			poster: $scope.currentUser.email,
			poster_avatar: avatars[id],
			total: task.total
		};

		Task.createTask(extendedTask)
			.then(function() {		
				$scope.tasks.push(extendedTask);
				$mdDialog.hide();
				Toast.pop('Yay, you have successfully added a task');
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0]);
			});
	};


	$scope.getTask = function(task) {
		$scope.currentTask = task;
		$scope.isCreator = ($scope.user.email === task.poster);
	};


	$scope.cancelTask = function(taskId) {
		Task.cancelTask(taskId);
	};






















	$scope.showModal = function(ev) {
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
			controller: 'UsersController',
			templateUrl: 'assets/angular-app/templates/user-sessions/new.html.erb',
			targetEvent: ev,
		});
		Sheet.hide();
	};

	$scope.showModalRegister = function(ev) {
		$mdDialog.show({
			controller: 'UsersController',
			templateUrl: 'assets/angular-app/templates/user-registrations/new.html.erb',
			targetEvent: ev,
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
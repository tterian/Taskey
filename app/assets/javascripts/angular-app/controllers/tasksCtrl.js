function TasksController($scope, $location, $mdDialog, $mdBottomSheet, Task) {
	//Get all the task records from the Task service
	$scope.tasks = Task.query();
	$scope.updatedAt = '-updated_at'
	$scope.currentUser = $scope.user

	//Invoke a modal dialog and add a post from the dialog
	$scope.addTask = function(ev) {
		$mdDialog.show({
			controller: 'PostDialogController',
			templateUrl: 'assets/angular-app/templates/partials/post.html.erb',
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
			templateUrl: 'assets/angular-app/templates/partials/edit.html.erb',
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
			controller: 'UsersController',
			templateUrl: 'assets/angular-app/templates/partials/bottom-sheet.html.erb',
			targetEvent: ev
		});
	};


  $scope.users = [
    {
      name: { first: 'try', last:'try' }
    },
    {
      name: { first: 'try2', last:'try2' }
    },
    {
      name: { first: 'try3', last:'try3' }
    }];
    
    
    $scope.selectedUserIndex = undefined;
    $scope.selectUserIndex = function (index) {
      if ($scope.selectedUserIndex !== index) {
        $scope.selectedUserIndex = index;
      }
      else {
        $scope.selectedUserIndex = undefined;
      }
    };


};
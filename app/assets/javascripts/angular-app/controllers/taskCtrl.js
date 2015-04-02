var appControllers = angular.module('appControllers', []);

appControllers.controller('TaskController', ['$scope', '$location', '$mdSidenav', '$mdDialog', '$mdBottomSheet', 'Task', function($scope, $location, $mdSidenav, $mdDialog, $mdBottomSheet, Task) {
	
	//Side Menu toggling for small devices
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	//Side menu items
	$scope.menu = [
			{
				link : '',
				title: 'Dashboard',
				icon: 'dashboard'
			},
			{
				link : '',
				title: 'Friends',
				icon: 'group'
			},
			{
				link : '',
				title: 'Messages',
				icon: 'message'
			}
	];

	//Side menu items (admin)
	$scope.admin = [
			{
				link : '',
				title: 'Trash',
				icon: 'delete'
			},
			{
				link : 'showListBottomSheet($event)',
				title: 'Settings',
				icon: 'settings'
			}
	];

	//Invoke a modal dialog and add a post from the dialog
	$scope.addTask = function(ev) {
		$mdDialog.show({
		controller: 'DialogController',
		templateUrl: 'assets/angular-app/templates/post.html.erb',
		targetEvent: ev
		})
		.then(function(answer) {
			var task = new Task(answer);
			task.$save(function() {
				$scope.tasks.unshift(task);
				$location.path('/browse');
			});
		});
	};


	//Bottom sheet controller
	$scope.showListBottomSheet = function(ev) {
		$scope.alert = '';
		$mdBottomSheet.show({
		controller: 'ListBottomSheetCtrl',
		templateUrl: 'assets/angular-app/templates/bottom_sheet.html.erb',
		targetEvent: ev
		}).then(function(clickedItem) {
			$scope.alert = clickedItem.name + ' clicked!';
		});
	};

	//Get all the task records from the DB
	$scope.tasks = Task.query();


}]);


//Controller for updating posts
appControllers.controller('UpdateController', ['$scope', '$location', '$routeParams', 'Task', function($scope, $location, $routeParams, Task) {
	$scope.selectedTask = Task.get({id: $routeParams.taskId});

	$scope.updateTask = function(task) {
		task.$update(function() {
			$location.path('/browse');
		});
	}
}]);


//Controller for listing bottom sheet
appControllers.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
	$scope.items = [
		{ name: 'Share', icon: 'share' },
		{ name: 'Upload', icon: 'upload' },
		{ name: 'Copy', icon: 'copy' },
		{ name: 'Print this page', icon: 'print' },
	];
	
	$scope.listItemClick = function($index) {
		var clickedItem = $scope.items[$index];
		$mdBottomSheet.hide(clickedItem);
	};
});


//Controller for modal dialog
appControllers.controller('DialogController', function($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
});

function UsersController($scope, $location, $mdDialog, User, Sheet, Toast) {

	$scope.userLogin = function(user) {
		User.userLogin(user)
			.then(function() {
				Toast.pop('Yay, you have successfully logged in');
				$mdDialog.hide();
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
				$mdDialog.hide();
			});
	};

	$scope.userRegister = function(user) {
		User.userRegister(user)
			.then(function() {
				User.userLogin(user);
				Toast.pop('Hey, welcome!');
				$mdDialog.hide();
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
				$mdDialog.hide();
			});
	};

};
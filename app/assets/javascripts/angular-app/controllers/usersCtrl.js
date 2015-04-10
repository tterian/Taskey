function UsersController($scope, $location, User, Sheet, Dialog, Toast) {

	$scope.userLogIn = function(user) {
		User.userLogIn(user)
			.then(function() {
				Dialog.hide();
				Toast.pop('Yay, you have successfully logged in');
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
			});
		$location.path('/');
	};

	$scope.userRegister = function(user) {
		User.userRegister(user)
			.then(function() {
				Dialog.hide();
				User.userLogIn(user);
				Toast.pop('Hey, welcome!');
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
			});
		$location.path('/');
	};

	$scope.userLogOut = function(ev) {
		User.userLogOut()
			.then(function() {
				Toast.pop('See you later!');
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
			});
		Sheet.hide();
		$location.path('/');
	};


	$scope.showModalLogin = function() {
		Dialog.userLogin();
		Sheet.hide();
	}

	$scope.showModalRegister = function() {
		Dialog.userRegister();
		Sheet.hide();
	}

};
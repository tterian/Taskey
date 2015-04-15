function UsersController($scope, $location, User, Sheet, Dialog, Toast) {

	$scope.userLogIn = function(user) {
		User.userLogIn(user)
			.then(function() {
				Toast.pop('Yay, you have successfully logged in');
				Dialog.hide();
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
				Dialog.hide();
			});
		$location.path('/');
	};

	$scope.userRegister = function(user) {
		User.userRegister(user)
			.then(function() {
				User.userLogIn(user);
				Toast.pop('Hey, welcome!');
				Dialog.hide();
			}, function(reason) {
				Toast.pop('No way, ' + reason.errors[0])
				Dialog.hide();
			});
		$location.path('/');
	};

	$scope.userLogOut = function() {
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
	};

	$scope.showModalRegister = function() {
		Dialog.userRegister();
		Sheet.hide();
	};



};
function UsersController($scope, $location, $mdBottomSheet, $mdDialog, $mdToast, $auth) {

	$scope.userLogIn = function(ev) {
		$mdBottomSheet.hide()
		$mdDialog.show({
			controller: 'UserDialogController',
			templateUrl: 'assets/angular-app/templates/user-sessions/new.html.erb',
			targetEvent: ev
		})
		.then(function(answer) {
			$auth.submitLogin({
				email: answer.email,
				password: answer.password
			}).then(function() {
				$mdToast.show(
					$mdToast.simple()
						.content('Yay, you have successfully logged in')
						.position("bottom right")
						.hideDelay(3000)
					);
			}, function(reason) {
				$mdToast.show(
					$mdToast.simple()
						.content("No way! " + reason.errors[0])
						.position("bottom right")
						.hideDelay(3000)
				);
			});
		});
	};

	$scope.userRegister = function(ev) {
		$mdBottomSheet.hide()
		$mdDialog.show({
			controller: 'UserDialogController',
			templateUrl: 'assets/angular-app/templates/user-registrations/new.html.erb',
			targetEvent: ev
		})
		.then(function(answer) {
			$auth.submitRegistration({
				email: answer.email,
				password: answer.password,
			}).then(function() { 
          		$auth.submitLogin({
            		email: answer.email,
            		password: answer.password,
          		});
        	});
        	
			$mdToast.show(
				$mdToast.simple()
					.content('Hey, thank you for coming in!')
					.position("bottom right")
					.hideDelay(3000)
			);
		});
	};

	$scope.userLogOut = function(ev) {
		$mdBottomSheet.hide()
		$auth.signOut()
			.then(function() {
			$mdToast.show(
				$mdToast.simple()
					.content('See you later!')
					.position("bottom right")
					.hideDelay(3000)
			);
		}, function(reason) {
			$mdToast.show(
				$mdToast.simple()
					.content("No way! " + reason.errors[0])
					.position("bottom right")
					.hideDelay(3000)
			);
		});
	};

};
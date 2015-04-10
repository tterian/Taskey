function Dialog($mdDialog, User) {

	var dialog = {
		userLogin: function(ev) {
			$mdDialog.show({
				controller: 'UsersController',
				templateUrl: 'assets/angular-app/templates/user-sessions/new.html.erb',
				targetEvent: ev
			});
		},

		userRegister: function(ev) {
			$mdDialog.show({
				controller: 'UsersController',
				templateUrl: 'assets/angular-app/templates/user-registrations/new.html.erb',
				targetEvent: ev
			});
		},

		addTask: function(ev) {
			$mdDialog.show({
				controller: 'TasksController',
				templateUrl: 'assets/angular-app/templates/partials/post.html.erb',
				targetEvent: ev
			});
		},


		hide: function() {
			$mdDialog.hide();
		}

	};

	return dialog;
};

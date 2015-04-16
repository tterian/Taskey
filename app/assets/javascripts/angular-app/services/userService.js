function User($auth) {

	var user = $auth.validateUser();

	var User = {
		currentUser: user.$$state.value,

		userLogin: function(user) {
			return $auth.submitLogin({
				email: user.email,
				password: user.password
			})
		},

		userLogOut: function() {
			return $auth.signOut()
		},

		userRegister: function(user) {
			return $auth.submitRegistration({
				email: user.email,
				password: user.password
			});
		},

		isLoggedIn: function(user) {
			return user.signedIn;
		},

		isAdmin: function() {
			return false
		}
	};
	return User;

};
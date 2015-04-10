function Sheet($mdBottomSheet, User) {

	var sheet = {
		show: function(ev) {
			$mdBottomSheet.show({
				controller: 'UsersController',
				templateUrl: 'assets/angular-app/templates/partials/bottom-sheet.html.erb',
				targetEvent: ev
			});
		},

		hide: function() {
			$mdBottomSheet.hide();
		}
	};

	return sheet;
};

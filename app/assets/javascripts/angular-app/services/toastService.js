function Toast($mdToast) {

	var content = '';

	var toast = {
		pop: function(content) {
			$mdToast.show(
				$mdToast.simple()
					.content(content)
					.position("bottom right")
					.hideDelay(3000)
			);
		}
	};

	return toast;
};

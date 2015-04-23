//Controller for edit dialog
function EditDialogController($scope, $mdDialog, currentTask) {
	$scope.currentTask = currentTask;
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
};
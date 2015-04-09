//var appServices = angular.module('appServices', ['ngResource']);

//appServices.factory('User', ['$resource', function($resource) {
//    return $resource('/users/:id', {id: '@id'});
//}]);

//appServices.factory('Task', ['$resource', function($resource) {
//	return $resource('/users/:userId/tasks/:id', {userId: '@userId', id: '@id'}, {update: {method: 'PATCH'}});
//}]);

function Task1($resource) {

	var tasks = $resource('/api/tasks/:id', {id: '@id'});

	var Task = {
		all: tasks,

		getTask: function(taskId) {
			return tasks.get({id: taskId});
		},

		createTask: function(task) {
			return tasks.$add(task);
		},

		editTask: function(task) {
			var t = this.getTask(task.$id);
			return t.$update({title: task.title, description: task.description, total: task.total});
		},

		cancelTask: function(taskId) {
			var t = this.getTask(taskId);
			return t.$update({status: "cenceled"});
		},

		isCreator: function(task) {
			return (user && user.provider && user.uid === task.user_id);
		},

		isOpen: function(task) {
			return task.status === "open";
		}

	};
	return Task;

//	return $resource('/api/tasks/:id', {id: '@id'}, {update: {method: 'PATCH'}});
};
function Task($resource, Toast, User) {

	var tasks = $resource('/api/tasks/:id', {id: '@id'});
	var currentUser = User.currentUser;

	var Task = {
		all: tasks.query(),

		getTask: function(taskId) {
			var t = tasks.get({id: taskId});
			return t;
		},

		createTask: function(task) {
			var t = new tasks (
			{
				title: task.title,
				status: 'open',
				poster: currentUser.email,
				description: task.description,
				total: task.total,
				user_id: currentUser.id
			});
			return t.$save();
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

};
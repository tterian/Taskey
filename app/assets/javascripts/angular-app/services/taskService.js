function Task($resource) {

	var tasks = $resource('/api/tasks/:taskId', 
		{
			taskId: '@id'
		},
		{
			get:    {method: 'GET'},
			update: {method: 'PATCH'}
		});

	var Task = {
		all: tasks.query(),

		getTask: function(taskId) {
			return tasks.get({taskId: taskId});
		},

		createTask: function(task) {
			var t = new tasks (
			{
				title: task.title,
				status: 'open',
				poster: task.poster,
				poster_avatar: task.poster_avatar,
				description: task.description,
				total: task.total
			});
			return t.$save();
		},

		editTask: function(task) {
			return task.$update();
		},

		cancelTask: function(taskId) {
			var t = tasks.get({'taskId': taskId}, function(task) {
				task.status = 'closed';
				task.$update();
			});
			return t;
		},

		isOpen: function(task) {
			return task.status === "open";
		}

	};
	return Task;

};
//var appServices = angular.module('appServices', ['ngResource']);

//appServices.factory('User', ['$resource', function($resource) {
//    return $resource('/users/:id', {id: '@id'});
//}]);

//appServices.factory('Task', ['$resource', function($resource) {
//	return $resource('/users/:userId/tasks/:id', {userId: '@userId', id: '@id'}, {update: {method: 'PATCH'}});
//}]);

function Task($resource) {


	return $resource('/api/tasks/:id', {id: '@id'}, {update: {method: 'PATCH'}});
};
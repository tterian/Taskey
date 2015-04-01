var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Task', ['$resource', function($resource) {
    return $resource('/tasks/:id', {id: '@id'}, {update: {method: 'PATCH'}});
}]);
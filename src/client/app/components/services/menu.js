angular.module('myWordPress.service.menuService', ['ngResource'])

.factory('Menu', ['$resource', function($resource){
	return $resource('http://localhost:4711/api/menus/:id', {}, {
    	query: {method:'GET', isArray:true},
    	save: {method:'POST', isArray:false},
     	update: {method:'PUT', isArray:true},
    });
  }]);

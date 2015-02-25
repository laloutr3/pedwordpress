angular.module('myWordPress.pageService', ['ngResource'])

.factory('Page', ['$resource', function($resource){
	return $resource('http://localhost:4711/api/pages/:id', {}, {
    	query: {method:'GET', isArray:true},
    	get: {method:'GET', isArray:false},
    	save: {method:'POST', isArray:true},
     	update: {method:'PUT', isArray:false}
    });
  }]);
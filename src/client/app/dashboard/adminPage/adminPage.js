'use strict';


angular.module('myWordPress.adminPage', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('dashboard.adminPage', {
		url: '/page',
		templateUrl: 'dashboard/adminPage/adminPage.html',
		controller: 'adminPageController'
	});

}])

.controller('adminPageController', ['$scope', 'Page', '$state','$stateParams',function($scope,Page, $state,$stateParams){
	$scope.pages = Page.query();

}]);

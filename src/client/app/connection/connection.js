'use strict';


angular.module('myWordPress.connection', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('app.connection', {
		url: 'connection',
		templateUrl: 'connection/connection.html',
		controller: 'connectionController'
	});

}])

.controller('connectionController', ['$scope','$http', '$rootScope', '$state', 'login' , function($scope, $http, $rootScope, $state, login){
	$scope.newUser;
	$scope.connectUser=function(){
  		if ($scope.connectionForm.$valid) {
			console.log($scope.newUser);

			login.login({
				username: $scope.newUser.login,
				password: $scope.newUser.password,
			}, function(user){

				$rootScope.currentUser = user;

				console.log("current user : " + $rootScope.currentUser);
				$state.go('app');

			}, function(error){
				console.log('Erreur de connexion.');
			});
		}else{
			console.log('Formulaire Invalide.');
		}
	}
}]);
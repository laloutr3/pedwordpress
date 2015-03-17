'use strict';


angular.module('myWordPress.pages', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.pages', {
		url: '/page/:id',
		templateUrl: 'site/pages/pages.html',
		controller: 'pagesController'
	});

}])

.controller('pagesController', ['$scope', '$state', '$stateParams', 'Page','$localStorage', 'AddFavorite', 'Article', function($scope, $state, $stateParams, Page, $localStorage, AddFavorite, Article){

	if(typeof $localStorage.currentUser != 'undefined'){
    	$scope.id_user = $localStorage.currentUser._id;
    	console.log($scope.id_user + " test id user");
	}

	$scope.page = Page.get({id: $stateParams.id}, function(page) {
        console.log("get page "+$stateParams.id);
        console.log(page.content);/*
        for(var i = 0; i < page.content.length; i++){
        	console.log(page.content[i].isFavorite);
        }*/
    });


	$scope.changeFavoris=function(id_article){
		AddFavorite.post(id_article, function(page) {
	        Article.get({id : id_article._id}, function(page) {
				$scope.art_to_change = page;
		        var tempo = $scope.page.content;
		        for(var i = 0; i < tempo.length; i++){
		        	if(tempo[i]._id == $scope.art_to_change._id){
		        		tempo[i].isFavorite = $scope.art_to_change.isFavorite;
		        		console.log('modification favorite');
		        	}
		        }
			}); 
	    });
	}


}]);
'use strict';


angular.module('myWordPress.siteTemplate', ['ui.router'])

.controller('siteTemplateController', ['$scope', '$rootScope', '$state','$stateParams', '$localStorage', 'Preferences', 
        function($scope, $rootScope, $state, $stateParams, $localStorage, Preferences){

        $scope.preferences = Preferences.get(function(succ){
                console.log("succes");
                console.log("prefs title: " + $scope.preferences.site.subtitle);
        }, function(err){
                console.log("error");
        });
        //console.log("prefs title: " + $scope.preferences.site.subtitle);
        

        $scope.isActiveHeader = function (viewLocation) { 
        	return viewLocation === $state.current.name;
        }

        $scope.isUserConnected = function() {
        	$rootScope.currentUser = $localStorage.currentUser;
        	return typeof $localStorage.currentUser != 'undefined';
        }

        $scope.logOut = function() {
                delete $rootScope.currentUser;
        	delete $localStorage.currentUser;
        }

        $scope.search= function(key){
                $state.go('site.searchKeyWord',{keywords: key});
        }
}]);
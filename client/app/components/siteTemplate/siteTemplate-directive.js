'use strict';

angular.module('myWordPress.siteTemplate.siteTemplate-directive', [])
.directive('scrollToItem', function() {                                                      
    return {                                                                                 
        restrict: 'A',                                                                       
        scope: {                                                                             
            scrollTo: "@"                                                                    
        },                                                                                   
        link: function(scope, $elm,attr) {                                                   

            $elm.on('click', function() {                                                    
                $('html,body').animate({scrollTop: 0}, "slow");
            });                                                                              
        }                                                                                    
}});

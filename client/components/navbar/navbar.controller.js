'use strict';

angular.module('mstarApp')
    .controller('NavbarCtrl', function($scope, $location) {
        $scope.menu = [{
            'title': 'Container',
            'link': '/container'
        }, {
            'title': 'Sort Sets',
            'link': '/sortsets'
        }, {
            'title': 'Mappings',
            'link': '/mappings'
        }, {
            'title': 'Preview',
            'link': '/preview'
        }];

        $scope.isCollapsed = true;

        $scope.isActive = function(route) {
            if ($location.path() == '/container') {
                $scope.headerText = "CONTAINER: None  |  VERSION: 3*  |  STATUS: Modified";
            } else {
                $scope.headerText = "CONTAINER: Auction.com  |  VERSION: 3*  |  STATUS: Modified";
            }
            return route === $location.path();
        };
    });

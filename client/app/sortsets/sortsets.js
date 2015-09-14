'use strict';

angular.module('mstarApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('sortsets', {
                url: '/sortsets',
                templateUrl: 'app/sortsets/sortsets.html',
                controller: 'SortsetsCtrl'
            });
    });

'use strict';

angular.module('mstarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mappings', {
        url: '/mappings',
        templateUrl: 'app/mappings/mappings.html',
        controller: 'MappingsCtrl'
      });
  });
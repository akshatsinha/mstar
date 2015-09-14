'use strict';

angular.module('mstarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('container', {
        url: '/container',
        templateUrl: 'app/container/container.html',
        controller: 'ContainerCtrl'
      });
  });
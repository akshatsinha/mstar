'use strict';

angular.module('mstarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('preview', {
        url: '/preview',
        templateUrl: 'app/preview/preview.html',
        controller: 'PreviewCtrl'
      });
  });
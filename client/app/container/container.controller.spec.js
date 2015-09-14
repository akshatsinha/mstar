'use strict';

describe('Controller: ContainerCtrl', function () {

  // load the controller's module
  beforeEach(module('mstarApp'));

  var ContainerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContainerCtrl = $controller('ContainerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

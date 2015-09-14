'use strict';

describe('Controller: MappingsCtrl', function () {

  // load the controller's module
  beforeEach(module('mstarApp'));

  var MappingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MappingsCtrl = $controller('MappingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

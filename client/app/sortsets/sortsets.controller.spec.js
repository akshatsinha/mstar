'use strict';

describe('Controller: SortsetsCtrl', function () {

  // load the controller's module
  beforeEach(module('mstarApp'));

  var SortsetsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SortsetsCtrl = $controller('SortsetsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

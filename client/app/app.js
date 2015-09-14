'use strict';

angular.module('mstarApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.sortable'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    })
    .factory('EventDispatchingSvc', function($rootScope) {
        function EventDispatchingSvc($scope) {
            var delisteners = [];
            if (!$scope) {
                throw new Error("A EventDispatchingSvc must have $scope to function. It wasn't found.");
            }
            this.dispatch = $rootScope.$emit.bind($rootScope);
            this.listen = function() {
                var args = Array.prototype.slice.call(arguments),
                    deListenFunc = $rootScope.$on.apply($rootScope, args);
                delisteners.push(deListenFunc);
                return deListenFunc;
            };
            $scope.$on('$destroy', function() {
                delisteners.forEach(function(deListenFunc) {
                    if (_.isFunction(deListenFunc)) {
                        deListenFunc.call();
                    }
                });
            });
        }
        return EventDispatchingSvc;
    })
    .factory('ajaxSvc', function($http) {
        return {
            callService: function(wrapper, fxn, data, successFxn) {
                var svcUrl = "http://adcsvc.com/jsonp";
                return $http.jsonp(svcUrl + "/" +  wrapper + "/" + fxn + ".php?callback=JSON_CALLBACK&data="+data);
            }
        };
    })
    .filter('unsafe', function ($sce) {
        return $sce.trustAsHtml;
    });

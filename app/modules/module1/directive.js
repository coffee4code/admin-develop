'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('module1.directive', [])
            .directive('greeting', [function () {
                return {
                    restrict: 'EAC',
                    template: '<div>{{message}}</div>',

                    link: function ($scope) {
                        $scope.message = 'hello from a directive';
                    }
                };
            }])
        ;
    }
);

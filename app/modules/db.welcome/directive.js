'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('db.welcome.directive', [])
            .directive('greetings', [function () {
                return {
                    restrict: 'EAC',
                    template: '<div>{{message}}</div>',

                    link: function ($scope) {
                        $scope.message = 'hello from a greetings directive';
                    }
                };
            }])
        ;
    }
);

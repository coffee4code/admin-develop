'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('home.controller', [])
            .controller('homeCtrl', [
                '$scope',
                function ($scope) {
                    $scope.hello = 'hello world';
                }
            ]);
    }
);


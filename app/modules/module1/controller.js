'use strict';
define(
    [
        'angular',
        './service'
    ],
    function (angular) {
        angular.module('module1.controller', [
            'module1.service'
        ])
            .controller('module1Ctrl', [
                '$scope',
                'service1',
                function ($scope, service1) {
                    $scope.msg = 'this is message from controller1';
                    $scope.serviceMsg = service1.getMessage();
                }
            ])
        ;
    }
);

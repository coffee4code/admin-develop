'use strict';
define(
    [
        'angular',
        './service'
    ],
    function (angular) {
        angular.module('db.welcome.controller', [
            'db.welcome.service'
        ])
            .controller('dbWelcomeCtrl', [
                '$scope',
                'service2',
                function ($scope, service2) {
                    $scope.msg = 'this is message from controller1';
                    $scope.serviceMsg = service2.getMessage();
                }
            ])
        ;
    }
);

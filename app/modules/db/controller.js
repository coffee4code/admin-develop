'use strict';
define(
    [
        'angular',
        './service'
    ],
    function (angular) {
        angular.module('db.controller', [
            'db.service'
        ])
            .controller('dbCtrl', [
                '$scope',
                'UserService',
                'service1',
                function ($scope, UserService, service1) {
                    $scope.user = UserService.getUser();
                    $scope.msg = 'this is message from controller1';
                    $scope.serviceMsg = service1.getMessage();
                }
            ])
        ;
    }
);

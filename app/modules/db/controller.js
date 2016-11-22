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
                'service1',
                function ($scope, service1) {
                    $scope.msg = 'this is message from controller1';
                    $scope.serviceMsg = service1.getMessage();
                }
            ])
        ;
    }
);

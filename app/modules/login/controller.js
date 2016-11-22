'use strict';
define(
    [
        'angular',
        './service'
    ],
    function (angular) {
        angular.module('login.controller', ['login.service'])
            .controller('loginCtrl', [
                '$scope',
                'LoginService',
                function ($scope, LoginService) {
                    $scope.isBusy = false;
                    $scope.user = {
                        username: '',
                        password: ''
                    };
                    $scope.onLogin = onLogin;

                    function onLogin () {
                        $scope.isBusy = true;
                        LoginService.login('u', 'p').then(function () {
                            $scope.isBusy = false;
                        }, function () {
                            $scope.isBusy = false;
                        });
                    }
                }
            ]);
    }
);


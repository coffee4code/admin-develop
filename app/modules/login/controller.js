'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('login.controller', [])
            .controller('loginCtrl', [
                '$scope',
                '$state',
                'UserService',
                'SignService',
                function ($scope, $state, UserService, SignService) {
                    $scope.current = {
                        isBusy: false,
                        erCode: 0
                    };
                    $scope.user = UserService.getUser();
                    $scope.onSignIn = onSignIn;

                    function onSignIn () {
                        $scope.current.isBusy = true;
                        SignService
                            .signIn($scope.user)
                            .then(function (res) {
                                if (res) {
                                    $state.go('db.welcome');
                                    return false;
                                }
                                $scope.current.erCode = 1;
                            }, function () {
                                $scope.current.erCode = 2;
                            })
                            .finally(function () {
                                $scope.current.isBusy = false;
                            })
                        ;
                    }
                }
            ]);
    }
);


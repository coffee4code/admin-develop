'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('db.controller', [])
            .controller('dbCtrl', [
                '$scope',
                '$window',
                'UserService',
                'SignService',
                function ($scope, $window, UserService, SignService) {
                    $scope.user = UserService.getUser();
                    $scope.onSignOut = onSignOut;

                    function onSignOut () {
                        SignService
                            .signOut()
                            .finally(function () {
                                $window.location.reload();
                            })
                        ;
                    }
                }
            ])
        ;
    }
);

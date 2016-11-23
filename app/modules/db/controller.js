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
                'SignService',
                'UserService',
                function ($scope, $window, SignService, UserService) {
                    $scope.onSignOut = onSignOut;
                    $scope.onInitUser = onInitUser;

                    function onInitUser () {
                        UserService.getUser().then(function (user) {
                            console.info(user);
                        });
                    }
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

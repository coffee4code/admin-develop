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
                function ($scope, $window, SignService) {
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

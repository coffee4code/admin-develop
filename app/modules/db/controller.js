'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('db.controller', [])
            .controller('dbHeaderCtrl', [
                '$scope',
                '$window',
                'SignService',
                'UserService',
                function ($scope, $window, SignService, UserService) {
                    console.info('dbHeaderCtrl');
                    $scope.current.pageInstance = 'dashboard';
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
            .controller('dbMenuCtrl', [
                '$scope',
                '$window',
                function ($scope) {
                    console.info($scope, 'dbMenuCtrl');
                }
            ])
            .controller('dbSidebarCtrl', [
                '$scope',
                '$window',
                function ($scope) {
                    console.info($scope, 'dbSidebarCtrl');
                }
            ])
            .controller('dbBodyCtrl', [
                '$scope',
                '$window',
                function ($scope) {
                    console.info($scope, 'dbBodyCtrl');
                }
            ])
        ;
    }
);

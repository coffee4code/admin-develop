'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('app.controller', [])
            .controller('appCtrl', [
                '$rootScope',
                '$scope',
                function ($rootScope, $scope) {
                    $scope.current = {
                        pageInstance: 'loading'
                    };
                }
            ])
        ;
    }
);

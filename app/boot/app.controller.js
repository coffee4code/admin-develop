'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('app.controller', [])
            .controller('appCtrl', [
                '$rootScope',
                function ($rootScope) {
                    $rootScope.run = 'run';
                }
            ])
        ;
    }
);

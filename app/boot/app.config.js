'use strict';
define(
    [
        'angular',
        'uiRouter'
    ],
    function (angular) {
        angular.module('app.config', [
            'ui.router'
        ])
            .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push('timestampService');
                $httpProvider.interceptors.push('SessionService');
            }]);
    }
);

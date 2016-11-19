'use strict';
define(
    [
        'angular',
        'constant',
        'config',
        'locale',
        'router',
        'directive',
        'filter',
        'controller',
        'service'
    ],
    function (angular) {
        var application = angular.module('app', [
            'app.constant',
            'app.config',
            'app.locale',
            'app.router',
            'app.directive',
            'app.filter',
            'app.controller',
            'app.service'
        ])
            .run([function () {

            }]);

        application.bootstrap = function () {
            angular.bootstrap(window.document, ['app']);
        };

        return application;
    }
);

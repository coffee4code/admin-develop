define(
    [
        'angular',
        'constant',
        'config',
        'router',
        'directive',
        'filter',
        'controller',
        'service'
    ],
    function (angular) {

        var app = angular.module('app', [
            'app.constant',
            'app.config',
            'app.router',
            'app.directive',
            'app.filter',
            'app.controller',
            'app.service'
        ]);

        app.bootstrap = function () {
            'use strict';
            angular.bootstrap(document, ['app']);
        };

        return app;
    }
);
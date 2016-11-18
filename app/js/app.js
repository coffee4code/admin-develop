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

        var application = angular.module('app', [
            'app.constant',
            'app.config',
            'app.router',
            'app.directive',
            'app.filter',
            'app.controller',
            'app.service'
        ])
            .run([function(){
                console.info('run');
            }]);

        application.bootstrap = function () {
            'use strict';
            angular.bootstrap(document, ['app']);
        };

        return application;
    }
);
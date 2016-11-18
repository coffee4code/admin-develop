define(['angular','router'], function (angular) {

    var app = angular.module('app', ['app.router']);

    app.bootstrap = function(){
        'use strict';
        angular.bootstrap(document, ['app']);
    };

    return app;
});
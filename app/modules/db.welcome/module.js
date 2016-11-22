'use strict';
define(
    [
        'angular',
        './controller',
        './directive'
    ],
    function (angular) {
        angular.module('modules.db.welcome', [
            'db.welcome.controller',
            'db.welcome.directive'
        ]);
    }
);

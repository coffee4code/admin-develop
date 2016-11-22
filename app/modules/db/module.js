'use strict';
define(
    [
        'angular',
        './controller',
        './directive'
    ],
    function (angular) {
        angular.module('modules.db', [
            'db.controller',
            'db.directive'
        ]);
    }
);

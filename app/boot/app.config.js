'use strict';
define(
    [
        'angular',
        'uiRouter',
        'ngBreadcrumb'
    ],
    function (angular) {
        angular.module('app.config', [
            'ui.router',
            'ncy-angular-breadcrumb'
        ])
            .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push('timestampService');
                $httpProvider.interceptors.push('SessionService');
            }])
            .config(['$breadcrumbProvider', function ($breadcrumbProvider) {
                $breadcrumbProvider.setOptions({
                    prefixStateName: 'db.welcome',
                    templateUrl: 'app/modules/db/template-breadcrumb.html'
                });
            }])
        ;
    }
);

'use strict';
define(
    [
        'angular',
        'uiRouter',
        'ngBreadcrumb',
        'blockUI'
    ],
    function (angular) {
        angular.module('app.config', [
            'ui.router',
            'ncy-angular-breadcrumb',
            'blockUI'
        ])
            .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push('TimestampService');
                $httpProvider.interceptors.push('SessionService');
            }])
            .config(['$breadcrumbProvider', function ($breadcrumbProvider) {
                $breadcrumbProvider.setOptions({
                    prefixStateName: 'db.welcome',
                    templateUrl: 'app/modules/db/template-breadcrumb.html'
                });
            }])
            .config(['blockUIConfig', function (blockUIConfig) {
                blockUIConfig.delay = 0;
                blockUIConfig.autoInjectBodyBlock = false;
                blockUIConfig.template = '' +
                    '<div class="block-ui-overlay"></div>' +
                    '<div class="block-ui-message-container">' +
                    '   <div class="loading-message">' +
                    '       <div class="block-spinner-bar">' +
                    '           <div class="bounce1"></div>' +
                    '           <div class="bounce2"></div>' +
                    '           <div class="bounce3"></div>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>';
            }])
        ;
    }
);

'use strict';
require.config({
    baseUrl: '',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',

        angular: '../bower_components/angular/angular',
        uiRouter: '../bower_components/ui-router/release/angular-ui-router',
        ocLazyLoad: '../bower_components/ocLazyLoad/dist/ocLazyLoad',

        decorator: '../app/js/app.decorator',
        constant: '../app/js/app.constant',
        config: '../app/js/app.config',
        locale: '../app/js/app.locale',
        router: '../app/js/app.router',
        directive: '../app/js/app.directive',
        filter: '../app/js/app.filter',
        controller: '../app/js/app.controller',
        service: '../app/js/app.service',
        application: '../app/js/app'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        angular: {
            exports: 'angular'
        },
        uiRouter: {
            deps: ['angular'],
            exports: 'uiRouter'
        },
        ocLazyLoad: {
            deps: ['angular'],
            exports: 'ocLazyLoad'
        }
    },
    config: {
        i18n: {
            // language support
            // [
            //      ''           // English, default language
            //      'zh-ch',     // Simplified Chinese
            //      'zh-hk',     // HK Traditional Chinese
            // ]
            locale: ''
        }
    }
});
require(['application'], function (application) {
    application.bootstrap();
});

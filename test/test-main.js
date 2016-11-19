'use strict';
var allTestFiles = [],
    TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    // dynamically load all test files
    deps: allTestFiles,

    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',

        angular: 'bower_components/angular/angular',
        uiRouter: 'bower_components/ui-router/release/angular-ui-router',
        ocLazyLoad: 'bower_components/ocLazyLoad/dist/ocLazyLoad',

        decorator: 'app/js/app.decorator',
        constant: 'app/js/app.constant',
        config: 'app/js/app.config',
        locale: 'app/js/app.locale',
        router: 'app/js/app.router',
        directive: 'app/js/app.directive',
        filter: 'app/js/app.filter',
        controller: 'app/js/app.controller',
        service: 'app/js/app.service',
        application: 'app/js/app'
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
        },
        decorator: {
            exports: 'decorator'
        },
        constant: {
            exports: 'constant'
        },
        config: {
            exports: 'config'
        },
        locale: {
            exports: 'locale'
        },
        router: {
            exports: 'router'
        },
        directive: {
            exports: 'directive'
        },
        filter: {
            exports: 'filter'
        },
        controller: {
            exports: 'controller'
        },
        service: {
            exports: 'service'
        },
        application: {
            exports: 'application'
        }
    },

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});

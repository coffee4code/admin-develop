define(['jquery','underscore','angular','uiRouter','ocLazyLoad','decorator'], function ($,_,angular) {

    var app = angular.module('app', ['ui.router','oc.lazyLoad','oc.lazyLoad.decotator']);

    app.config(['$ocLazyLoadProvider','$stateProvider', '$urlRouterProvider',
        function ($ocLazyLoadProvider,$stateProvider, $urlRouterProvider) {

            $ocLazyLoadProvider.config({
                loadedModules: ['app'],
                asyncLoader: require
            });

            $urlRouterProvider.otherwise('/home');

            $stateProvider

                .state('home', {
                    url: '/home',
                    views: {
                        'vw':{
                            templateUrl: 'home.html'
                        }
                    }
                })

                .state('module1', {
                    url: '/module1',
                    views: {
                        'vw':{
                            lazyModule: 'app.module1',
                            lazyFiles: 'module1/module',
                            lazyTemplateUrl: 'module1/template.html',
                            controller: 'module1Controller'
                        }
                    }
                })

                .state('module2', {
                    url: '/module2',
                    views: {
                        'vw': {
                            lazyModule: 'app.module2',
                            lazyFiles: 'module2/module',
                            lazyTemplateUrl: 'module2.html',
                            controller: 'module2Ctrl'
                        }
                    }
                })
                .state('module3', {
                    url: "/module3",
                    views: {
                        'vw': {
                            lazyModule: 'app.module3',
                            lazyFiles: 'module3/module',
                            lazyTemplateUrl: 'module3.html',
                            controller: 'module3Ctrl'
                        }
                    }
                })
            ;
        }
    ]);

    app.bootstrap = function(){
        'use strict';
        angular.bootstrap(document, ['app']);
    };

    return app;
});
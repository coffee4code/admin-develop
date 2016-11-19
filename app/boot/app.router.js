'use strict';
define(
    [
        'angular',
        'uiRouter',
        'ocLazyLoad',
        'decorator'
    ],
    function (angular) {
        angular.module('app.router', [
            'ui.router',
            'oc.lazyLoad',
            'app.decotator'
        ])
            .config([
                '$ocLazyLoadProvider',
                '$stateProvider',
                '$urlRouterProvider',
                '$locationProvider',
                function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
                    $locationProvider.hashPrefix('!');
                    $locationProvider.html5Mode(true);

                    $ocLazyLoadProvider.config({
                        loadedModules: ['app'],
                        asyncLoader: require
                    });

                    $urlRouterProvider.otherwise('/home');

                    $stateProvider

                        .state('home', {
                            url: '/home',
                            views: {
                                vw: {
                                    lazyModule: 'modules.home',
                                    lazyFiles: 'app/modules/home/module',
                                    lazyTemplateUrl: 'app/modules/home/template.html',
                                    controller: 'homeCtrl'
                                }
                            }
                        })

                        .state('module1', {
                            url: '/module1',
                            views: {
                                vw: {
                                    lazyModule: 'modules.module1',
                                    lazyFiles: 'app/modules/module1/module',
                                    lazyTemplateUrl: 'app/modules/module1/template.html',
                                    controller: 'module1Ctrl'
                                }
                            }
                        })
                    ;
                }
            ])
        ;
    }
);

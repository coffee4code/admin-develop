define(['jquery','underscore','angular','uiRouter','ocLazyLoad'], function ($,_,angular) {

    var app = angular.module('app', ['ui.router','oc.lazyLoad']);

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
                            templateUrl: 'module1/module.html',
                            resolve: {
                                load: function($ocLazyLoad) {
                                    return $ocLazyLoad.load ({
                                        name: 'module1',
                                        files: ['module1/controller.js','module1/service.js','module1/module.js']
                                    });
                                }
                            }
                        }
                    }
                })

                .state('module2', {
                    url: '/module2',
                    views: {
                        'vw': {
                            templateUrl: 'module2/module.html',
                            resolve: {
                                load: function($ocLazyLoad) {
                                    return $ocLazyLoad.load ({
                                        name: 'module2',
                                        files: ['module2/controller.js','module2/directive.js','module2/module.js']
                                    });
                                }
                            }
                        }
                    }
                });
        }
    ]);

    app.bootstrap = function(){
        'use strict';
        angular.bootstrap(document, ['app']);
    };

    return app;
});
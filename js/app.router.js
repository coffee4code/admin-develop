define(['angular','uiRouter','ocLazyLoad','decorator'], function (angular) {

    angular.module('app.router', ['ui.router','oc.lazyLoad','oc.lazyLoad.decotator'])

        .config(['$ocLazyLoadProvider','$stateProvider', '$urlRouterProvider',
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
                                lazyModule: 'app.home',
                                lazyFiles: 'modules/home/module',
                                lazyTemplateUrl: 'modules/home/template.html',
                                controller: 'homeCtrl'
                            }
                        }
                    })

                    .state('module1', {
                        url: '/module1',
                        views: {
                            'vw':{
                                lazyModule: 'app.module1',
                                lazyFiles: 'modules/module1/module',
                                lazyTemplateUrl: 'modules/module1/template.html',
                                controller: 'module1Ctrl'
                            }
                        }
                    })

                    .state('module2', {
                        url: '/module2',
                        views: {
                            'vw': {
                                lazyModule: 'app.module2',
                                lazyFiles: 'modules/module2/module',
                                lazyTemplateUrl: 'modules/module2/template.html',
                                controller: 'module2Ctrl'
                            }
                        }
                    })
                    .state('module3', {
                        url: "/module3",
                        views: {
                            'vw': {
                                lazyModule: 'app.module3',
                                lazyFiles: 'modules/module3/module',
                                lazyTemplateUrl: 'modules/module3/template.html',
                                controller: 'module3Ctrl'
                            }
                        }
                    })
                ;
            }
        ]);
});
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
                                'vw': {
                                    lazyModule: 'modules.home',
                                    lazyFiles: 'modules/home/module',
                                    lazyTemplateUrl: 'modules/home/template.html',
                                    controller: 'homeCtrl'
                                }
                            }
                        })

                        .state('module1', {
                            url: '/module1',
                            views: {
                                'vw': {
                                    lazyModule: 'modules.module1',
                                    lazyFiles: 'modules/module1/module',
                                    lazyTemplateUrl: 'modules/module1/template.html',
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
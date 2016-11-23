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

                    $urlRouterProvider.otherwise('/login');

                    $stateProvider

                        .state('login', {
                            url: '/login',
                            views: {
                                vw: {
                                    lazyModule: 'modules.login',
                                    lazyFiles: 'app/modules/login/module',
                                    lazyTemplateUrl: 'app/modules/login/template.html',
                                    controller: 'loginCtrl',
                                    resolve: {
                                        auth: ['$q', '$state', '$timeout', 'AuthService', function ($q, $state, $timeout, AuthService) {
                                            return AuthService
                                                .checkAuth()
                                                .then(function (tokenValid) {
                                                    if (tokenValid) {
                                                        $state.go('db.welcome');
                                                        return false;
                                                    }
                                                });
                                        }]
                                    }
                                }
                            }
                        })

                        .state('db', {
                            url: '/dashboard',
                            abstract: true,
                            views: {
                                vw: {
                                    lazyModule: 'modules.db',
                                    lazyFiles: 'app/modules/db/module',
                                    lazyTemplateUrl: 'app/modules/db/template.html',
                                    controller: 'dbCtrl',
                                    resolve: {
                                        auth: ['$q', '$state', '$timeout', 'AuthService', function ($q, $state, $timeout, AuthService) {
                                            return AuthService
                                                .checkAuth()
                                                .then(function (tokenValid) {
                                                    if (!tokenValid) {
                                                        $state.go('login');
                                                        return false;
                                                    }
                                                });
                                        }]
                                    }
                                }
                            }
                        })

                        .state('db.welcome', {
                            url: '',
                            views: {
                                vw1: {
                                    lazyModule: 'modules.db.welcome',
                                    lazyFiles: 'app/modules/db.welcome/module',
                                    lazyTemplateUrl: 'app/modules/db.welcome/template.html',
                                    controller: 'dbWelcomeCtrl'
                                }
                            }
                        })
                    ;
                }
            ])
        ;
    }
);

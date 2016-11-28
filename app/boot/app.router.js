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
                                login: {
                                    lazyModule: 'modules.login',
                                    lazyFiles: 'app/modules/login/module',
                                    lazyTemplateUrl: 'app/modules/login/template.html',
                                    controller: 'loginCtrl'
                                }
                            },
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
                        })

                        .state('db', {
                            url: '/dashboard',
                            abstract: true,
                            views: {
                                header: {
                                    lazyModule: 'modules.db',
                                    lazyFiles: 'app/modules/db/module',
                                    lazyTemplateUrl: 'app/modules/db/template-header.html',
                                    controller: 'dbHeaderCtrl'
                                },
                                menu: {
                                    lazyModule: 'modules.db',
                                    lazyFiles: 'app/modules/db/module',
                                    lazyTemplateUrl: 'app/modules/db/template-menu.html',
                                    controller: 'dbMenuCtrl'
                                },
                                sidebar: {
                                    lazyModule: 'modules.db',
                                    lazyFiles: 'app/modules/db/module',
                                    lazyTemplateUrl: 'app/modules/db/template-sidebar.html',
                                    controller: 'dbSidebarCtrl'
                                },
                                content: {
                                    lazyModule: 'modules.db',
                                    lazyFiles: 'app/modules/db/module',
                                    lazyTemplateUrl: 'app/modules/db/template-body.html',
                                    controller: 'dbBodyCtrl'
                                }
                            },
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
                        })

                        .state('db.welcome', {
                            url: '',
                            views: {
                                page: {
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

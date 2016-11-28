'use strict';
define(
    [
        'angular',
        'constant',
        'config',
        'locale',
        'router',
        'directive',
        'filter',
        'controller',
        'service'
    ],
    function (angular) {
        var application = angular.module('app', [
            'app.constant',
            'app.config',
            'app.locale',
            'app.router',
            'app.directive',
            'app.filter',
            'app.controller',
            'app.service'
        ])
            .run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
                $rootScope.$on('$stateChangeStart', function (event, toState) {
                    checkRole();

                    function checkRole () {
                        var role = toState.data.role;
                        AuthService
                            .checkAuth()
                            .then(function (tokenValid) {
                                switch (role) {
                                    case 'no-login':
                                        if (tokenValid) {
                                            $state.go('db.welcome');
                                            return false;
                                        }
                                        break;
                                    case 'admin':
                                        if (!tokenValid) {
                                            $state.go('login');
                                            return false;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            })
                        ;
                    }
                });
            }]);

        application.bootstrap = function () {
            angular.bootstrap(window.document, ['app']);
        };

        return application;
    }
);

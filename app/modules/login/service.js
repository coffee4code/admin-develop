'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('login.service', [])
            .service('SignService', ['$q', '$timeout', 'UserService', function ($q, $timeout, UserService) {
                this.signIn = signIn;
                this.signOut = signOut;

                function signIn (user) {
                    var defer = $q.defer();
                    $timeout(function () {
                        if (user.username === 'demo' && user.password === 'demo1234') {
                            UserService.setUser(user.username, user.password);
                            defer.resolve(true);
                            return false;
                        }
                        if (user.username === 'demo1' && user.password === 'demo1234') {
                            defer.resolve(false);
                            return false;
                        }

                        defer.reject(true);
                    }, 1000);

                    return defer.promise;
                }
                function signOut () {
                    var defer = $q.defer();
                    $timeout(function () {
                        UserService.setUser('', '');
                        defer.resolve(true);
                    }, 1000);

                    return defer.promise;
                }
            }])
        ;
    }
);

'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('app.service', [])
            .service('UserService', [function () {
                this.user = new User();

                this.getUser = getUser;
                this.setUser = setUser;

                function User () {
                    this.username = '';
                    this.password = '';
                }
                function getUser () {
                    return this.user;
                }
                function setUser (username, password) {
                    this.user.username = username;
                    this.user.password = password;
                }
            }])
            .service('SignService', ['$q', '$timeout', 'UserService', 'AuthService', function ($q, $timeout, UserService, AuthService) {
                this.signIn = signIn;
                this.signOut = signOut;

                function signIn (user) {
                    var defer = $q.defer();
                    $timeout(function () {
                        if (user.username === 'demo' && user.password === 'demo1234') {
                            UserService.setUser(user.username, user.password);
                            AuthService.setAuth();
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
                        AuthService.delAuth();
                        UserService.setUser('', '');
                        defer.resolve(true);
                    }, 1000);

                    return defer.promise;
                }
            }])
            .service('AuthService', ['$window', function ($window) {
                this.authKey = 'auth';

                this.getAuth = getAuth;
                this.setAuth = setAuth;
                this.delAuth = delAuth;

                function getAuth () {
                    return $window.localStorage.getItem(this.authKey);
                }
                function setAuth () {
                    $window.localStorage.setItem(this.authKey, 1);
                }
                function delAuth () {
                    $window.localStorage.removeItem(this.authKey);
                }
            }])
        ;
    }
);

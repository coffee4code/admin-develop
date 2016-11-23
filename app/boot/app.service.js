'use strict';
define(
    [
        'angular',
        'ngCookies'
    ],
    function (angular) {
        angular.module('app.service', ['ngCookies'])
            .service('UserService', [function () {
                this.user = new User();

                this.getUser = getUser;
                this.setUser = setUser;

                function User () {
                    this.username = null;
                    this.password = null;
                }
                function getUser () {
                    return this.user;
                }
                function setUser (username, password) {
                    this.user.username = username;
                    this.user.password = password;
                }
            }])
            .service('SignService', ['$q', '$timeout', 'AuthService', function ($q, $timeout, AuthService) {
                this.signIn = signIn;
                this.signOut = signOut;

                function signIn (user) {
                    var defer = $q.defer();
                    $timeout(function () {
                        var token = 'this-is-a-token',
                            expire = 1800;
                        if (user.username === 'demo' && user.password === 'demo1234') {
                            AuthService.setAuth(token, expire);
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
                        defer.resolve(true);
                    }, 0);

                    return defer.promise;
                }
            }])
            .service('AuthService', ['$window', '$timeout', '$q', '$http', '$cookies', function ($window, $timeout, $q, $http, $cookies) {
                this.auth = new Auth();

                this.getAuth = getAuth;
                this.setAuth = setAuth;
                this.delAuth = delAuth;
                this.expAuth = expAuth;
                this.checkAuth = checkAuth;

                function Auth () {
                    this.token = null;
                    this.expr = null;
                }
                function getAuth () {
                    var data = this.auth.token ? this.auth : JSON.parse($cookies.get('token'));
                    return data.token;
                }
                function checkAuth (force) {
                    if (force) {
                        delAuth();
                    }

                    var defer = $q.defer(),
                        token = $cookies.get('token');

                    // If we have the token in memory, assert it valid
                    if (this.auth.token) {
                        defer.resolve(true);
                    } else {
                        // Else, we check this token in server
                        $timeout(function () {
                            defer.resolve(token);
                        }, 0);
                    }

                    return defer.promise;
                }
                function setAuth (token, expr) {
                    var exp = new Date();
                    this.auth.token = token;
                    this.auth.expr = expr;
                    exp.setSeconds(exp.getSeconds() + Number(expr));
                    $cookies.put('token', JSON.stringify(this.auth), {path: '/', expires: exp});
                }
                function delAuth () {
                    $cookies.remove('token');
                    this.auth.token = null;
                    this.auth.expr = null;
                }
                function expAuth () {
                    var exp = new Date();
                    exp.setSeconds(exp.getSeconds() + Number(this.token.expr));
                    $cookies.put('token', JSON.stringify(this.auth), {path: '/', expires: exp});
                }
            }])
        ;
    }
);

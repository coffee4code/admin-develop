'use strict';
define(
    [
        'angular',
        'ngCookies'
    ],
    function (angular) {
        angular.module('app.service', ['ngCookies'])
            .service('UserService', ['$q', '$http', function ($q, $http) {
                this.getUser = getUser;

                function getUser () {
                    var defer = $q.defer();
                    $http({url: 'http://test-server.findhobbees.com/cl_api/api_login', method: 'POST'})
                        .then(function (response) {
                            console.info(response);
                        }, function () {
                            console.info('rejected');
                        })
                    ;
                    return defer.promise;
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
            .service('AuthService', ['$window', '$timeout', '$q', '$cookies', function ($window, $timeout, $q, $cookies) {
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
                    if (this.auth.token) {
                        return this.auth;
                    }
                    var data = $cookies.get('token');
                    if (data) {
                        data = JSON.parse(data);
                        return data;
                    }
                    return null;
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
            .service('timestampService', [function () {
                this.request = request;
                this.response = response;

                // Tag a json request with start timestamp when request
                function request (config) {
                    if (!(/\.html/.test(config.url))) {
                        config.timeStart = new Date().getTime();
                    }
                    return config;
                }
                // Log and debug response timestamp
                function response (OriginResponse) {
                    if (!(/\.html/.test(OriginResponse.config.url))) {
                        OriginResponse.config.timeEnd = new Date().getTime();
                        var time = OriginResponse.config.timeEnd - OriginResponse.config.timeStart;
                        console.group('------------json request----------');
                        console.info('url: ' + OriginResponse.config.url);
                        console.info('time: ' + time);
                        console.groupEnd();
                    }
                    return OriginResponse;
                }
            }])
            .service('SessionService', ['$rootScope', '$q', 'AuthService', function ($rootScope, $q, AuthService) {
                this.request = request;
                this.response = response;
                this.requestError = requestError;
                this.responseError = responseError;

                // Auto append token to request data
                function request (config) {
                    config.data = config.data || {};
                    var auth = AuthService.getAuth();
                    if (auth && auth.token) {
                        config.data.token = auth.token;
                    }
                    return config;
                }
                //TODO Refresh token if response success
                //TODO Clear token if response expired broadcast expired event
                function response (originalResponse) {
                    return originalResponse;
                }
                function requestError (rejection) {
                    return $q.reject(rejection);
                }
                //TODO Broadcast Server Exception event, such as 404 and so on.
                function responseError (rejection) {
                    console.info('response Error', rejection);
                    // var config = rejection.config || {};
                    // if (!config.ignoreAuthModule) {
                    //     switch (rejection.status) {
                    //         case 401:
                    //             var deferred = $q.defer();
                    //             var bufferLength = httpBuffer.append(config, deferred);
                    //             if (bufferLength === 1)
                    //                 $rootScope.$broadcast('event:auth-loginRequired', rejection);
                    //             return deferred.promise;
                    //         case 403:
                    //             $rootScope.$broadcast('event:auth-forbidden', rejection);
                    //             break;
                    //     }
                    // }
                    // otherwise, default behaviour
                    return $q.reject(rejection);
                }
            }])
        ;
    }
);

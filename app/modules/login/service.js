'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('login.service', [])
            .service('LoginService', ['$q', '$timeout', function ($q, $timeout) {
                this.login = login;

                function login (username, password) {
                    var defer = $q.defer();

                    $timeout(function () {
                        if (username && password) {
                            defer.reject(true);
                        }
                    }, 3000);

                    return defer.promise;
                }
            }])
        ;
    }
);

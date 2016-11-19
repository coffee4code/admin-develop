'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('app.service', [])
            .factory('Users', function () {
                var Users = {};

                Users.all = function () {};

                return Users;
            })
        ;
    }
);

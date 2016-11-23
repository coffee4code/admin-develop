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
        ;
    }
);

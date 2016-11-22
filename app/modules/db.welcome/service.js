'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('db.welcome.service', [])
            .service('service2', function () {
                this.getMessage = function () {
                    return 'Hello from lazy loaded service';
                };
            })
        ;
    }
);

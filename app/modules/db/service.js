'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('db.service', [])
            .service('service1', function () {
                this.getMessage = function () {
                    return 'Hello from lazy loaded service';
                };
            })
        ;
    }
);

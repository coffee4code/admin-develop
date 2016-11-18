define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('module1.service', [])
            .service('service1', function () {
                this.getMessage = function () {
                    return 'Hello from lazy loaded service';
                }
            })
        ;
    }
);

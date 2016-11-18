define(['jquery','underscore','angular'],function($,_,angular) {
    angular.module('app.module1.service',[]).factory('service1', function () {
        return {
            getMessage: function () {
                return 'Hello from lazy loaded service';
            }
        };
    });
});

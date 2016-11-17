define(['jquery','underscore','angular',function($,_,angular) {
    var module= angular.module('module1.service',[]).factory('service1', function () {
        return {
            getMessage: function () {
                return 'Hello from lazy loaded service';
            }
        };
    });
    return module;
}]);

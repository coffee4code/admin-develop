define(['jquery','underscore','angular',function($,_,angular) {
    var module= angular.module('module1.controller',[]).controller('module1Controller', ['service1', function (service1) {
        this.message = service1.getMessage();
    }]);
    return module;
}]);

define(['jquery','underscore','angular','./service','./controller',function($,_,angular){
    var module= angular.module('app.module1',['module1.controller','module1.service']);
    return module;
}]);

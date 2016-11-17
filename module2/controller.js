//define(['jquery','underscore','angular','./service','./controller',function($,_,angular){
    angular.module('module2.controller',[]).controller('module2Controller',function(){
        this.message = 'Hello from a lazy loaded controller';
    });
//}]);
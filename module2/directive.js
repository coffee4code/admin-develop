//define(['jquery','underscore','angular','./service','./controller',function($,_,angular){
    angular.module('module2.directive',[]).directive('greeting', function(){

        return {
            template:'<div>{{message}}</div>',

            link:function($scope){
                $scope.message = 'hello from a directive';
            }};
    });
//}]);
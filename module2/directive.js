define(['angular'],function(angular){
    angular.module('app.module2.directive',[])
        .directive('greeting', function(){

            return {
                template:'<div>{{message}}</div>',

                link:function($scope){
                    $scope.message = 'hello from a directive';
                }};
        });
});
define(['angular'],function(angular){
    angular.module('app.module2.controller',[])
        .controller('module2Ctrl',function($scope){
            $scope.msg = 'Hello from a lazy module 2';
    });
});
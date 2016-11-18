define(['angular'],function(angular){
    angular.module('app.module2.controller',[])
        .controller('module2Ctrl',function($scope){
            $scope.message = 'Hello from a lazy loaded controller';
    });
});
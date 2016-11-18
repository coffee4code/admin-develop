define(['angular'],function(angular) {
    angular.module('app.module1.controller',[])
        .controller('module1Ctrl', ['$scope', function ($scope) {
            $scope.message = 'this is message from controller1';
        }]);
});

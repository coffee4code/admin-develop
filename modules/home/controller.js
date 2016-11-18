define(['angular'],function(angular) {
    angular.module('app.home.controller',[])
        .controller('homeCtrl', ['$scope', function ($scope) {
            $scope.hello = 'hello world';
        }]);
});

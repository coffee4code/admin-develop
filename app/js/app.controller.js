define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('app.controller', [])
            .controller('appCtrl',[
                '$rootScope',
                '$scope',
                function($rootScope,$scope){
                    console.info('appCtrl initialized');
                }
            ])
        ;
    }
);
define(
    [
        'angular',
        'i18n!app/nls/button.js'
    ],
    function (angular,button) {
        angular.module('app.controller', [])
            .controller('appCtrl',[
                '$rootScope',
                '$scope',
                function($rootScope,$scope){
                    $rootScope.LANG = {
                        BUTTON: button
                    };
                    console.info('appCtrl initialized');
                }
            ])
        ;
    }
);
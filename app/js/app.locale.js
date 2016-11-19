define(
    [
        'angular',
        'app/plugins/requirejs/i18n!app/nls/button.js'
    ],
    function (angular,button) {
        angular.module('app.locale', [])
            .run([
                '$rootScope',
                function($rootScope){
                    $rootScope.LANG = {
                        BUTTON: button
                    };
                }
            ])
        ;
    }
);
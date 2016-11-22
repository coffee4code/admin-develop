'use strict';
define(
    [
        'angular',
        'app/plugins/requirejs/i18n!app/nls/meta',
        'app/plugins/requirejs/i18n!app/nls/button',
        'app/plugins/requirejs/i18n!app/nls/placeholder',
        'app/plugins/requirejs/i18n!app/nls/alert'
    ],
    function (angular, meta, button, placeholder, alert) {
        angular.module('app.locale', [])
            .run([
                '$rootScope',
                function ($rootScope) {
                    $rootScope.LANG = {
                        META: meta,
                        BUTTON: button,
                        PLACEHOLDER: placeholder,
                        ALERT: alert
                    };
                }
            ])
        ;
    }
);

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
                'LocaleService',
                function ($rootScope, LocaleService) {
                    $rootScope.LANG = {
                        META: LocaleService.getMeta(),
                        BUTTON: LocaleService.getButton(),
                        PLACEHOLDER: LocaleService.getPlaceholder(),
                        ALERT: LocaleService.getAlert()
                    };
                }
            ])
            .service('LocaleService', [function () {
                return {
                    getMeta: getMeta,
                    getButton: getButton,
                    getPlaceholder: getPlaceholder,
                    getAlert: getAlert
                };

                function getMeta () {
                    return meta;
                }
                function getButton () {
                    return button;
                }
                function getPlaceholder () {
                    return placeholder;
                }
                function getAlert () {
                    return alert;
                }
            }])
        ;
    }
);

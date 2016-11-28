'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('app.filter', [])
            .filter('trustedHtml', ['$sce', function ($sce) {
                return function (html) {
                    return $sce.trustAsHtml(html);
                };
            }])
            .filter('translate', ['$rootScope', function ($rootScope) {
                var LANG = $rootScope.LANG;
                return function (str) {
                    if (!str) {
                        return '';
                    }
                    var arr = str.split('.'),
                        type = ('' + arr[0]).toUpperCase(),
                        key = arr[1];
                    return LANG[type][key];
                };
            }])
        ;
    }
);

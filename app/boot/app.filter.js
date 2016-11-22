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
            }]);
    }
);

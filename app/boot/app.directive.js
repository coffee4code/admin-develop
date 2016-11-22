'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('app.directive', [])
            .directive('hbBtnBusy', [function () {
                return {
                    restrict: 'A',
                    scope: {
                        isBusy: '=',
                        resetText: '@',
                        busyText: '@',
                        disabled: '=ngDisabled'
                    },
                    link: function (scope, element) {
                        var statClass = 'is-busy',
                            resetContent = '<span>' + scope.resetText + '</span>',
                            busyContent = scope.busyText ? '<span>' + (scope.busyText) + '</span>' : '<span class="loader-small-container"><i class="loader"></i></span>';

                        scope.$watch('isBusy', function (stat) {
                            if (stat) {
                                setBusy();
                            } else {
                                setIdle();
                            }
                        });

                        function setIdle () {
                            if (!scope.disabled) {
                                element.removeAttr('disabled');
                            }
                            element.removeClass(statClass).empty().append(resetContent);
                        }
                        function setBusy () {
                            element.attr('disabled', true).addClass(statClass).empty().append(busyContent);
                        }
                    }
                };
            }])
        ;
    }
);

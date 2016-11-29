'use strict';
define(
    [
        'angular',
        'ngSlimScroll'
    ],
    function (angular) {
        angular.module('app.directive', [
            'jkuri.slimscroll'
        ])
            .directive('hbPageInstance', [function () {
                return {
                    restrice: 'EA',
                    scope: {
                        pageId: '@',
                        pageInstance: '=',
                        pageWrapper: '@'
                    },
                    link: function ($scope, $element) {
                        var $body = $('body');
                        $scope.$watch('pageInstance', function (instance) {
                            $element.hide();
                            if (instance === $scope.pageId) {
                                $body.removeClass().addClass($scope.pageWrapper);
                                $element.show();
                            }
                        });
                    }
                };
            }])
            .directive('hbUpdateTitle', ['LocaleService', function (LocaleService) {
                return {
                    restrict: 'E',
                    scope: {
                        title: '@',
                        mainTitle: '@'
                    },
                    link: function (scope) {
                        var appName = LocaleService.getMeta().TITLE;
                        scope.$watch('title', function (newValue) {
                            if (typeof newValue !== 'undefined') {
                                if (document) {
                                    if (!newValue) {
                                        document.title = appName;
                                        return false;
                                    }
                                    document.title = (newValue === appName ? '' : appName + ' | ') + (scope.mainTitle ? scope.mainTitle + '-' : '') + newValue;
                                }
                            }
                        });
                    }
                };
            }])
            .directive('hbPageFullHeight', ['$timeout', function ($timeout) {
                return {
                    restrice: 'EA',
                    scope: {
                        offset: '@',
                        min: '@'
                    },
                    link: function ($scope, $element) {
                        var timer = null;

                        setMinHeight();
                        $(window).bind('resize', function () {
                            if (timer) {
                                $timeout.cancel(timer);
                            }
                            timer = $timeout(function () {
                                setMinHeight();
                            }, 200);
                        });
                        function setMinHeight () {
                            var height = $(window).innerHeight();
                            if ($scope.offset) {
                                height = height - Number($scope.offset);
                            }
                            height = height > Number($scope.min) ? height : $scope.min;
                            $element.css('min-height', height + 'px');
                        }
                    }
                };
            }])
            .directive('hbBtnBusy', [function () {
                return {
                    restrict: 'A',
                    scope: {
                        isBusy: '=',
                        resetText: '@',
                        busyText: '@',
                        disabled: '=ngDisabled'
                    },
                    link: function ($scope, $element) {
                        var statClass = 'is-busy',
                            resetContent = '<span>' + $scope.resetText + '</span>',
                            busyContent = $scope.busyText ? '<span>' + ($scope.busyText) + '</span>' : '<span class="loader-small-container"><i class="loader"></i></span>';

                        $scope.$watch('isBusy', function (stat) {
                            if (stat) {
                                setBusy();
                            } else {
                                setIdle();
                            }
                        });

                        function setIdle () {
                            if (!$scope.disabled) {
                                $element.removeAttr('disabled');
                            }
                            $element.removeClass(statClass).empty().append(resetContent);
                        }
                        function setBusy () {
                            $element.attr('disabled', true).addClass(statClass).empty().append(busyContent);
                        }
                    }
                };
            }])
        ;
    }
);

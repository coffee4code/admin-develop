'use strict';
define(
    [
        'angular'
    ],
    function (angular) {
        angular.module('db.directive', [])
            .directive('hbSideBarToggler', [function () {
                return {
                    restrict: 'EAC',
                    link: function ($scope, $element) {
                        var $body = $('body');
                        $element.bind('click', function () {
                            $body.toggleClass('page-quick-sidebar-open');
                        });
                    }
                };
            }])
            .directive('hbDropMenuToggler', [function () {
                return {
                    restrict: 'EAC',
                    link: function ($scope, $element) {
                        var $siblings = $element.siblings('li.dropdown');
                        $element.bind({
                            click: function () {
                                $siblings.removeClass('open');
                                $element.toggleClass('open');
                            }
                        });
                        $(document).unbind('click').bind('click', function (e) {
                            var $trigger = $('li.dropdown');
                            if ($trigger !== e.target && !$trigger.has(e.target).length) {
                                $trigger.removeClass('open');
                            }
                        });
                    }
                };
            }])
            .directive('hbSideMenuToggler', [function () {
                return {
                    restrict: 'EAC',
                    link: function ($scope, $element) {
                        var $body = $('body'),
                            $menu = $element.parents('.page-sidebar-menu');
                        $element.bind('click', function () {
                            $body.toggleClass('page-sidebar-closed');
                            $menu.toggleClass('page-sidebar-menu-closed');
                        });
                    }
                };
            }])
            .directive('hbSubMenuToggler', [function () {
                return {
                    restrict: 'EAC',
                    link: function ($scope, $element) {
                        var $siblings = $element.siblings('li[hb-sub-menu-toggler]');
                        $element.bind('click', function (e) {
                            if (!$(e.target).closest('.sub-menu').length) {
                                $siblings.each(function (index, val) {
                                    $(val).removeClass('open');
                                    $($(val).find('span.arrow')).removeClass('open');
                                    $($(val).find('ul.sub-menu')).slideUp();
                                });
                                var $subArrow = $($element.find('span.arrow')),
                                    $subMenu = $($element.find('ul.sub-menu'));
                                if ($($element[0]).hasClass('open')) {
                                    $element.removeClass('open');
                                    $subArrow.removeClass('open');
                                    $subMenu.slideUp();
                                    return false;
                                }
                                $element.addClass('open');
                                $subArrow.addClass('open');
                                $subMenu.slideDown();
                            }
                        });
                    }
                };
            }])
            .directive('hbSubMenuItem', [function () {
                return {
                    restrict: 'EAC',
                    link: function ($scope, $element) {
                        var $siblings = $element.siblings('li[hb-sub-menu-item]'),
                            $parentToggler = $element.closest('li[hb-sub-menu-toggler]'),
                            $parentTogglerSiblings = $parentToggler.siblings('li[hb-sub-menu-toggler]');
                        $element.bind('click', function () {
                            $parentTogglerSiblings.removeClass('active');
                            $parentToggler.addClass('active');
                            $siblings.each(function (index, val) {
                                $(val).removeClass('active');
                            });
                            $element.addClass('active');
                        });
                    }
                };
            }])
            .directive('hbTabHeader', [function () {
                return {
                    restrict: 'EAC',
                    scope: {
                        tabTargetId: '@'
                    },
                    link: function ($scope, $element) {
                        var $siblings = $element.siblings('[hb-tab-header]'),
                            $siblingsGroup = $element.siblings('[hb-tab-header-group]'),
                            $target = $('#' + $scope.tabTargetId),
                            $targetSiblings = $target.siblings('[tab-body]'),
                            $parentGroup = $element.closest('[hb-tab-header-group]'),
                            $parentGroupSiblings = $parentGroup.siblings('[hb-tab-header]');
                        $element.bind('click', function () {
                            if ($element.closest('[hb-tab-header-group]').length) {
                                $element.closest('[hb-tab-header-group]').addClass('active');
                                $parentGroupSiblings.removeClass('active');
                            } else {
                                $siblings.removeClass('active');
                                $siblingsGroup.removeClass('active open');
                                $element.addClass('active');
                            }
                            $targetSiblings.removeClass('active');
                            $target.addClass('active');
                        });
                    }
                };
            }])
        ;
    }
);

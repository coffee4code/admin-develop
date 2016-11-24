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
                            mouseenter: function () {
                                $siblings.removeClass('open');
                                $element.toggleClass('open');
                            },
                            mouseleave: function () {
                                $element.toggleClass('open');
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
                        $element.bind('click', function () {
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
                        });
                    }
                };
            }])
        ;
    }
);

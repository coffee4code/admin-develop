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
            .directive('hbPortlet', ['blockUI', 'UtilService', function (blockUI, UtilService) {
                return {
                    restrict: 'EAC',
                    transclude: true,
                    scope: {
                        color: '@'
                    },
                    template: function () {
                        var uuid = UtilService.guid();
                        return '' +
                            '<div block-ui="' + uuid + '">' +
                            '   <div class="portlet box" ng-class="color" ng-transclude></div>' +
                            '</div>';
                    },
                    controller: function ($scope, $element) {
                        var blockInstance,
                            isBlocking;
                        this.startBlock = startBlock;
                        this.stopBlock = stopBlock;

                        function startBlock () {
                            var blockId = $element.find('[block-ui]').attr('block-ui');
                            blockInstance = blockUI.instances.get(blockId);
                            blockInstance.start();
                            isBlocking = true;
                        }
                        function stopBlock () {
                            if (isBlocking) {
                                $scope.$apply(function () {
                                    blockInstance.stop();
                                    isBlocking = false;
                                });
                            }
                        }
                    }
                };
            }])
            .directive('hbPortletBody', [function () {
                return {
                    restrict: 'EAC',
                    replace: true,
                    transclude: true,
                    template: '' +
                    '<div class="portlet-body">' +
                    '   <div ng-transclude></div>' +
                    '</div>'
                };
            }])
            .directive('hbPortletHeader', [function () {
                return {
                    restrict: 'EAC',
                    replace: true,
                    scope: {
                        title: '@'
                    },
                    template: '' +
                        '<div class="portlet-title">' +
                        '   <div class="caption">' +
                        '       <i class="fa fa-gift"></i>' +
                        '       {{title}}' +
                        '   </div>' +
                        '   <div class="tools">' +
                        '       <hb-portlet-header-collapse></hb-portlet-header-collapse>' +
                        '       <hb-portlet-header-reload></hb-portlet-header-reload>' +
                        '       <hb-portlet-header-full-screen></hb-portlet-header-full-screen>' +
                        '       <hb-portlet-header-close></hb-portlet-header-close>' +
                        '   </div>' +
                        '</div>',
                    link: function () {
                    }
                };
            }])
            .directive('hbPortletHeaderCollapse', [function () {
                return {
                    restrict: 'EAC',
                    replace: true,
                    require: '?^hbPortletHeader',
                    template: '<a href="javascript:;" class="collapse" ng-click="collapseBody();" data-original-title="" title=""></a>',
                    link: function ($scope, $element) {
                        $scope.collapseBody = collapseBody;

                        function collapseBody () {
                            $element.toggleClass('collapse expand');
                            $element.closest('.portlet-title').siblings('.portlet-body').slideToggle();
                        }
                    }
                };
            }])
            .directive('hbPortletHeaderFullScreen', ['$timeout', function ($timeout) {
                return {
                    restrict: 'EAC',
                    replace: true,
                    require: '?^hbPortlet',
                    template: '<a href="javascript:;" class="fullscreen" ng-click="fullScreen();" data-original-title="" title=""></a>',
                    link: function ($scope, $element) {
                        var timer = null,
                            $portlet = $element.closest('.portlet'),
                            $portletBody = $element.closest('.portlet').find('.portlet-body');
                        $scope.fullScreen = fullScreen;

                        function fullScreen () {
                            $element.toggleClass('on');
                            if ($portlet.hasClass('portlet-fullscreen')) {
                                $portlet.removeClass('portlet-fullscreen');
                                removeMinHeight();
                                return;
                            }
                            $portlet.addClass('portlet-fullscreen');
                            setMinHeight();
                        }
                        function setMinHeight () {
                            var height = $(window).innerHeight();
                            $portletBody.css('min-height', (height - 41) + 'px');
                        }
                        function removeMinHeight () {
                            $portletBody.css('min-height', 'auto');
                        }

                        $(window).bind('resize', function () {
                            if (timer) {
                                $timeout.cancel(timer);
                            }
                            timer = $timeout(function () {
                                if ($portlet.hasClass('portlet-fullscreen')) {
                                    setMinHeight();
                                }
                            }, 200);
                        });
                    }
                };
            }])
            .directive('hbPortletHeaderClose', [function () {
                return {
                    restrict: 'EAC',
                    replace: true,
                    require: '?^hbPortlet',
                    template: '<a href="javascript:;" class="remove" ng-click="close();" data-original-title="" title=""></a>',
                    link: function ($scope, $element) {
                        var $portlet = $element.closest('.portlet');
                        $scope.close = close;

                        function close () {
                            $portlet.remove();
                        }
                    }
                };
            }])
            .directive('hbPortletHeaderReload', [function () {
                return {
                    restrict: 'EAC',
                    replace: true,
                    require: '^hbPortlet',
                    template: '<a href="javascript:;" class="reload" ng-click="reload();" data-original-title="" title=""></a>',
                    link: function ($scope, $element, attrs, hbPortletCtrl) {
                        $scope.reload = reload;

                        function reload () {
                            hbPortletCtrl.startBlock();

                            setTimeout(function () {
                                hbPortletCtrl.stopBlock();
                            }, 1000);
                        }
                    }
                };
            }])
        ;
    }
);

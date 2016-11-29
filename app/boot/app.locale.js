'use strict';
define(
    [
        'angular',
        'app/plugins/requirejs/i18n!app/nls/meta',
        'app/plugins/requirejs/i18n!app/nls/button',
        'app/plugins/requirejs/i18n!app/nls/placeholder',
        'app/plugins/requirejs/i18n!app/nls/alert',
        'app/plugins/requirejs/i18n!app/nls/menu'
    ],
    function (angular, meta, button, placeholder, alert, menu) {
        angular.module('app.locale', [])
            .run([
                '$rootScope',
                '$window',
                'LocaleService',
                'LanguageService',
                function ($rootScope, $window, LocaleService, LanguageService) {
                    LanguageService.initLanguage();
                    $rootScope.LANG = {
                        META: LocaleService.getMeta(),
                        BUTTON: LocaleService.getButton(),
                        PLACEHOLDER: LocaleService.getPlaceholder(),
                        ALERT: LocaleService.getAlert(),
                        MENU: LocaleService.getMenu()
                    };
                }
            ])
            .service('LocaleService', [function () {
                return {
                    getMeta: getMeta,
                    getButton: getButton,
                    getPlaceholder: getPlaceholder,
                    getAlert: getAlert,
                    getMenu: getMenu
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
                function getMenu () {
                    return menu;
                }
            }])
            .service('LanguageService', ['$rootScope', '$window', function ($rootScope, $window) {
                this.getLanguage = getLanguage;
                this.setLanguage = setLanguage;
                this.initLanguage = initLanguage;
                this.toggleLanguage = toggleLanguage;

                function initLanguage () {
                    getLanguage();
                }
                function toggleLanguage (lang) {
                    lang = lang || '';
                    $rootScope.lang = lang;
                    setLanguage(lang);
                }
                function getLanguage () {
                    $rootScope.lang = $window.localStorage.getItem('locale') || $rootScope.lang;
                }
                function setLanguage (lang) {
                    $window.localStorage.setItem('locale', lang);
                    $window.location.reload();
                }
            }])
            .constant('LANGUAGE_CONFIG', {
                '': {
                    flag: 'app/images/theme/flags/us.png',
                    display: 'English',
                    helper: 'Select your language.'
                },
                'zh-cn': {
                    flag: 'app/images/theme/flags/cn.png',
                    display: '简体中文',
                    helper: '切换语言'
                },
                'zh-hk': {
                    flag: 'app/images/theme/flags/hk.png',
                    display: '繁體中文',
                    helper: '切換語言'
                }
            })
            .directive('hbLanguageDisplay', ['$rootScope', 'LANGUAGE_CONFIG', function ($rootScope, LANGUAGE_CONFIG) {
                return {
                    restrict: 'EAC',
                    replace: true,
                    template: function () {
                        var lang = $rootScope.lang || '',
                            template = '';
                        template += '<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">';
                        template += '   <img alt="" src="' + LANGUAGE_CONFIG[lang].flag + '">';
                        template += '   <span class="langname">' + LANGUAGE_CONFIG[lang].display + '</span>';
                        template += '   <i class="fa fa-angle-down"></i>';
                        template += '</a>';
                        return template;
                    }
                };
            }])
            .directive('hbLanguageToggler', ['LANGUAGE_CONFIG', 'LanguageService', function (LANGUAGE_CONFIG, LanguageService) {
                return {
                    restrict: 'EAC',
                    replace: true,
                    template: '' +
                        '<li>' +
                        '   <a href="javascript:;" ng-click="toggleLanguage();">' +
                        '   <img alt="" ng-src="{{flag}}"> {{display}} </a>' +
                        '</li>',
                    scope: {
                        toggleLang: '@'
                    },
                    link: function ($scope) {
                        $scope.toggleLanguage = toggleLanguage;

                        init();
                        function init () {
                            $scope.toggleLang = $scope.toggleLang || '';
                            $scope.display = LANGUAGE_CONFIG[$scope.toggleLang].display;
                            $scope.flag = LANGUAGE_CONFIG[$scope.toggleLang].flag;
                        }

                        function toggleLanguage () {
                            LanguageService.toggleLanguage($scope.toggleLang);
                        }
                    }
                };
            }])
            .directive('hbLanguageTogglerHelper', ['$rootScope', 'LANGUAGE_CONFIG', function ($rootScope, LANGUAGE_CONFIG) {
                return {
                    restrict: 'EAC',
                    replace: true,
                    template: '<li class="external"> <h3>{{helper}}</h3> </li>',
                    link: function ($scope) {
                        var lang = $rootScope.lang || '';
                        $scope.helper = LANGUAGE_CONFIG[lang].helper;
                    }
                };
            }])
        ;
    }
);

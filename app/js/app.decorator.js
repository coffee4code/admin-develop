define(
    [
        'angular',
        'uiRouter',
        'ocLazyLoad'
    ],
    function (angular) {

        angular.module('app.decotator', [
            'ui.router',
            'oc.lazyLoad'
        ])
            .config(['$stateProvider',function ($stateProvider) {

                /**
                 * module: string module id
                 * files: a single file (string), or an array of files to load
                 * templateUrl: view template
                 *
                 * returns an object with the following keys: values
                 *  - templateProvider: (function)
                 *  - resolve: (array) minification-safe injection function array
                 */
                function lazyBundle(module, files, templateUrl) {
                    var lazyDeferred;
                    return {
                        templateProvider: function lazyTemplateProvider() {
                            return lazyDeferred.promise;
                        },
                        resolve: ['$templateCache', '$ocLazyLoad', '$q', '$http', '$compile', function lazyResolve($templateCache, $ocLazyLoad, $q, $http, $compile) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load({
                                name: module,
                                files: angular.isArray(files) ? files : [files]
                            }).then(function () {
                                if (!templateUrl) {
                                    lazyDeferred.resolve();
                                    return false;
                                }
                                if ($templateCache.get(templateUrl)) {
                                    lazyDeferred.resolve($templateCache.get(templateUrl));
                                    return false;
                                }
                                $http.get(templateUrl).then(function (response) {
                                    $templateCache.put(templateUrl, response.data);
                                    lazyDeferred.resolve($templateCache.get(templateUrl));
                                });
                            });
                        }]
                    };
                }

                /**
                 * Add the following properties to your $stateProvider.state definition (in a top-level, or view object):
                 *  lazyModule: 'app.lazy'
                 *  lazyFiles: 'lazy'
                 *  lazyTemplateUrl: 'lazy.html'  [optional]
                 *
                 * Automatically adds to each state with lazyModule, lazyFiles, and lazyTemplateUrl properties:
                 *  - a templateProvider which resolves with value $templateCache.get(lazyTemplateUrl) after all
                 *    of the lazyFiles are loaded (only if a lazyTemplateUrl property is defined)
                 *  - a resolve function named $lazyLoader which resolves after all of the lazyFiles are loaded.
                 *    Before resolving, $ocLazyLoad({ name: lazyModule, files: lazyFiles }) will be called
                 */
                $stateProvider.decorator('views', function ($state, parent) {
                    var result = {},
                        views = parent($state);

                    angular.forEach(views, function (config, name) {
                        if (config.lazyModule && config.lazyFiles && config.lazyTemplateUrl) {
                            var bundle = lazyBundle(config.lazyModule, config.lazyFiles, config.lazyTemplateUrl);
                            config.resolve = config.resolve || {};
                            config.resolve.$lazyLoader = bundle.resolve;
                            if (config.lazyTemplateUrl) config.templateProvider = bundle.templateProvider;
                        }
                        result[name] = config;
                    });
                    return views;
                });

            }])
        ;
    }
);
require.config({
    baseUrl:'',
    paths: {
        jquery:'./bower_components/jquery/dist/jquery',
        underscore:'./bower_components/underscore/underscore',
        angular: './bower_components/angular/angular',
        uiRouter: './bower_components/ui-router/release/angular-ui-router',
        ocLazyLoad: './bower_components/ocLazyLoad/dist/ocLazyLoad',
        decorator: './decorator',
        application:'./application'
    },
    shim: {
        'jquery':{
            exports:'$'
        },
        'underscore':{
            exports:'_'
        },
        'angular': {
            exports: 'angular'
        },
        'uiRouter': {
            deps:['angular'],
            exports: 'uiRouter'
        },
        'ocLazyLoad':{
            deps:['angular'],
            exports: 'ocLazyLoad'
        }
    },
    config: {
        i18n: {
            locale: 'zh-cn'
        }
    }
});
require(['application'], function (application) {
    application.bootstrap();
});
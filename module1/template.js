// Imagine that this file was actually compiled with something like grunt-html2js
// So, what you actually started with was a bunch of .html files which were compiled into this one .js file...
define(['angular'], function (angular) {
  angular.module('app.module1.template', [])
    .run(function($templateCache) {
      $templateCache.put('module1/template.html', '<p>This is lazy content! and <strong>{{data}}</strong> <a href="#">go back</a></p>');
    });
});
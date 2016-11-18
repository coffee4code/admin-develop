// Imagine that this file was actually compiled with something like grunt-html2js
// So, what you actually started with was a bunch of .html files which were compiled into this one .js file...
define(['angular'], function (angular) {
  angular.module('app.module3.service', [])
      .factory('service3', function () {
        return {
          getMessage: function () {
            return 'Hello from lazy loaded service';
          }
        };
      });
});
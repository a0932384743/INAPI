(function () {
  'use strict';

  angular.module('inapi')
    .config(config);

  config.$inject = ['$urlRouterProvider'];

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());

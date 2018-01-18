(function () {
  'use strict';

  angular.module('core')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'core/views/core-1-1-home.tpl.html',
      controller: 'CoreHomeCtrl',
      controllerAs: 'vm',
      data: {
        escapeIfLoggedIn: true
      }
    });
  }
}());

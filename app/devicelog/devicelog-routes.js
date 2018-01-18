(function () {
  'use strict';

  angular.module('devicelog')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('devicelog', {
      abstract: true,
      url: '/devicelog',
      template: '<data-ui-view />'
    }).state('devicelog.list', {
      url: '/list',
      templateUrl: 'devicelog/views/devicelog-5-1-list.tpl.html',
      controller: 'DevicelogListCtrl',
      controllerAs: 'vm',
      data: {
        needLogin: true
      }
    }).state('devicelog.detail', {
      url: '/detail',
      templateUrl: 'devicelog/views/devicelog-5-3-detail.tpl.html',
      controller: 'DevicelogDetailCtrl',
      controllerAs: 'vm',
      params: {
        devId: null,
        devCategory: null
      },
      data: {
        needLogin: true
      }
    });
  }
}());

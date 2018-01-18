(function () {
  'use strict';

  angular.module('consulting')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('consulting', {
      abstract: true,
      url: '/consulting',
      template: '<data-ui-view />'
    }).state('consulting.post', {
      url: '/consulting/post',
      templateUrl: 'consulting/views/consulting-7-1-post.tpl.html',
      controller: 'ConsultingPostCtrl',
      controllerAs: 'vm',
      data: {
        needLogin: true
      }
    });
  }
}());

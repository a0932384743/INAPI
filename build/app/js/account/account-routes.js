(function () {
  'use strict';

  angular.module('account')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('account', {
      abstract: true,
      url: '/account',
      template: '<data-ui-view />'
    }).state('account.user-info', {
      url: '/user-info',
      templateUrl: 'account/views/account-8-1-user-info.tpl.html',
      controller: 'AccountUserInfoCtrl',
      controllerAs: 'vm',
      data: {
        needLogin: true
      }
    });
  }
}());

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

//# sourceMappingURL=account-routes.js.map

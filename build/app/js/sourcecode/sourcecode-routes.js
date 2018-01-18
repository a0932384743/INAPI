(function () {
  'use strict';

  angular.module('sourcecode')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('sourcecode', {
      abstract: true,
      url: '/sourcecode',
      template: '<data-ui-view />'
    }).state('sourcecode.list', {
      url: '/list',
      templateUrl: 'sourcecode/views/sourcecode-4-1-list.tpl.html',
      controller: 'SourcecodeListCtrl',
      controllerAs: 'vm',
      data: {
        needLogin: true
      }
    });
  }
}());

//# sourceMappingURL=sourcecode-routes.js.map

//# sourceMappingURL=sourcecode-routes.js.map

//# sourceMappingURL=sourcecode-routes.js.map

//# sourceMappingURL=sourcecode-routes.js.map

//# sourceMappingURL=sourcecode-routes.js.map

//# sourceMappingURL=sourcecode-routes.js.map

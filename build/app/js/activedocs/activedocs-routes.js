(function () {
  'use strict';

  angular.module('activedocs')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('activedocs', {
      abstract: true,
      url: '/activedocs',
      template: '<data-ui-view />'
    }).state('activedocs.list', {
      url: '/list',
      templateUrl: 'activedocs/views/activedocs-3-1-list.tpl.html',
      controller: 'ActivedocsListCtrl',
      controllerAs: 'vm',
      data: {
        needLogin: true
      }
    });
  }
}());

//# sourceMappingURL=activedocs-routes.js.map

//# sourceMappingURL=activedocs-routes.js.map

//# sourceMappingURL=activedocs-routes.js.map

//# sourceMappingURL=activedocs-routes.js.map

//# sourceMappingURL=activedocs-routes.js.map

//# sourceMappingURL=activedocs-routes.js.map

//# sourceMappingURL=activedocs-routes.js.map

//# sourceMappingURL=activedocs-routes.js.map

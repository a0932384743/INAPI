(function () {
  'use strict';

  angular.module('download')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('download', {
      abstract: true,
      url: '/download',
      template: '<data-ui-view />'
    }).state('download.list', {
      url: '/list',
      templateUrl: 'download/views/download-6-1-list.tpl.html',
      controller: 'DownloadListCtrl',
      controllerAs: 'vm',
      data: {
        needLogin: true
      }
    });
  }
}());

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

//# sourceMappingURL=download-routes.js.map

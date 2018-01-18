(function () {
  'use strict';

  angular.module('navigation')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('navigation', {
      abstract: true,
      url: '/navigation',
      template: '<data-ui-view />'
    }).state('navigation.machine-install', {
      url: '/machine-install',
      templateUrl: 'navigation/views/navigation-2-1-machine-install.tpl.html',
      data: {
        needLogin: true
      }
    }).state('navigation.emulator-download', {
      url: '/emulator-download',
      templateUrl: 'navigation/views/navigation-2-2-emulator-download.tpl.html',
      data: {
        needLogin: true
      }
    }).state('navigation.doc-download', {
      url: '/doc-download',
      templateUrl: 'navigation/views/navigation-2-3-doc-download.tpl.html',
      data: {
        needLogin: true
      }
    }).state('navigation.activedocs', {
      url: '/activedocs',
      templateUrl: 'navigation/views/navigation-2-4-activedocs.tpl.html',
      data: {
        needLogin: true
      }
    }).state('navigation.sample', {
      url: '/sample',
      templateUrl: 'navigation/views/navigation-2-5-sample.tpl.html',
      data: {
        needLogin: true
      }
    }).state('navigation.devicelog', {
      url: '/devicelog',
      templateUrl: 'navigation/views/navigation-2-6-devicelog.tpl.html',
      data: {
        needLogin: true
      }
    }).state('navigation.consulting', {
      url: '/consulting',
      templateUrl: 'navigation/views/navigation-2-7-consulting.tpl.html',
      data: {
        needLogin: true
      }
    });
  }
}());

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

//# sourceMappingURL=navigation-routes.js.map

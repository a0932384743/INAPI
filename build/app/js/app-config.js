(function () {
  'use strict';

  angular.module('inapi')
    .config(config);

  config.$inject = ['$translateProvider', 'dialogsProvider'];

  function config($translateProvider, dialogsProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useLoaderCache('$templateCache');
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.json'
    });

    // 設定預設 dialog 樣式
    dialogsProvider.setSize('sm');
  }
}());

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

//# sourceMappingURL=app-config.js.map

(function () {
  'use strict';

  angular.module('inapi')
    .run(run);

  run.$inject = ['$rootScope', '$state', '$translate', 'i18nService', 'StorageAPI', 'SecureAuth', 'APP_CONFIG'];

  /* jshint unused:false */
  /* eslint no-unused-vars:0 */
  function run($rootScope, $state, $translate, i18nService, StorageAPI, SecureAuth, APP_CONFIG) {
    var stateChangeStartCB;

    // 設定預設語系
    $translate.use('zh-tw');
    i18nService.setCurrentLang('zh-tw');
    // 將 localStorage 的 passwordToken 讀出
    StorageAPI.readAllToken();
    // 設定 url redirect 條件
    stateChangeStartCB = $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        var isLoggedIn = SecureAuth.isLogin();
        if (toState.data && toState.data.needLogin && !isLoggedIn) {
          event.preventDefault();
          StorageAPI.setReturnState(toState.name);
          $state.go(APP_CONFIG.loginState);
        } else if (toState.data && toState.data.escapeIfLoggedIn && isLoggedIn) {
          event.preventDefault();
          $state.go(APP_CONFIG.firstStateAfterLogin);
        }
      }
    );
  }
}());

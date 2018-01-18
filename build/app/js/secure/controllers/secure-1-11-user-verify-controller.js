(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureUserVerifyCtrl', Ctrl);

  Ctrl.$inject = ['$state', '$location', 'dialogs', 'base64', 'APP_CONFIG', 'StorageAPI', 'InApiUtils', 'SecureAuth'];

  function Ctrl($state, $location, dialogs, base64, APP_CONFIG, StorageAPI, InApiUtils, SecureAuth) {
    var vm = this, urlParams, encodedUn, code;

    urlParams = $location.search() || {};
    encodedUn = urlParams.un || '';
    code = urlParams.code || '';

    function authCheck() {
      if (!encodedUn || encodedUn === '' || !code || code === '') {
        $state.go(APP_CONFIG.homeState);
        return false;
      }

      return true;
    }

    function handleErrCode(err) {
      err = err || {code: ''};

      switch (err.code) {
        case '0':
          StorageAPI.setFlagUserVerified(true);
          $state.go('secure.user-verify-success');
          return;
        case '7000':
          dialogs.notify('開發者會員帳號認證失敗', '伺服器發生錯誤。');
          break;
        case '7100':
          dialogs.notify('開發者會員帳號認證失敗', '無效的參數。');
          break;
        case '7110':
          dialogs.notify('開發者會員帳號認證失敗', '無效的帳號。');
          break;
        case '7113':
          dialogs.notify('開發者會員帳號認證失敗', '無效的驗證碼。');
          break;
        default:
          dialogs.notify(
            '認證開發者會員帳號失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}, 錯誤訊息：{1}', err.code, err.msg)
          );
      }

      $state.go(APP_CONFIG.homeState);
    }

    function doSubmit() {
      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      var postParams = {
        this_user_id: base64.decode(encodedUn),
        this_apsystem: 'DPA',
        code: code
      };

      SecureAuth.doVerifyUser(postParams)
        .then(function (resData) {
          handleErrCode(resData.err);
        }, function () {
          dialogs.notify('開發者會員帳號認證失敗', '伺服器拒絕存取，請稍後再試。');
        });
    }

    if (authCheck()) {
      SecureAuth.doLogout();
      doSubmit();
    }

    return vm;
  }
}());

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-controller.js.map

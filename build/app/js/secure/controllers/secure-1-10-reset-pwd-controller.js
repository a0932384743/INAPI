(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureResetPwdCtrl', Ctrl);

  Ctrl.$inject = ['$state', '$location', 'dialogs', 'base64',
                  'APP_CONFIG', 'InApiUtils', 'InApiValidator', 'ValidationSummary', 'SecureAuth'];

  function Ctrl($state, $location, dialogs, base64,
                APP_CONFIG, InApiUtils, InApiValidator, ValidationSummary, SecureAuth) {
    var vm = this, urlParams, encodedUn, code;

    urlParams = $location.search() || {};
    encodedUn = urlParams.un || '';
    code = urlParams.code || '';

    vm.isSending = false;

    function authCheck() {
      if (!encodedUn || encodedUn === '' || !code || code === '') {
        $state.go(APP_CONFIG.homeState);
        return false;
      }

      return true;
    }

    function resetForm() {
      vm.newPwd = vm.newPwdConfirm = '';
    }

    function validateForm() {
      var newPwd = vm.newPwd || '', newPwdConfirm = vm.newPwdConfirm || '', summary = ValidationSummary;

      summary.clear();

      if (!newPwd || newPwd.length < 1) {
        summary.push('新密碼不得為空');
      } else if (!InApiValidator.isValidPassword(newPwd)) {
        summary.push('新密碼格式錯誤');
      }

      if (newPwdConfirm !== newPwd) {
        summary.push('確認密碼與新密碼必須相同');
      }

      if (summary.count() > 0) {
        dialogs.notify('表單驗證有誤', summary.flush());
        return false;
      }

      return true;
    }

    function handleErrCode(err) {
      err = err || {code: ''};

      switch (err.code) {
        case '0':
          dialogs.notify('重設密碼成功', '請使用新密碼進行登入。');
          $state.go(APP_CONFIG.loginState);
          return;
        case '7000':
          dialogs.notify('重設密碼失敗', '伺服器發生錯誤，請稍後再次提交表單。');
          break;
        case '7100':
          dialogs.notify('重設密碼失敗', '提交資訊有誤。');
          resetForm();
          break;
        default:
          dialogs.notify('重設密碼失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}, 錯誤訊息：{1}', err.code, err.msg));
      }
    }

    function doSubmit() {
      var newPwd, newPwdConfirm, postParams;

      if (validateForm()) {
        newPwd = vm.newPwd || '';
        newPwdConfirm = vm.newPwdConfirm || '';
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          this_user_id: base64.decode(encodedUn),
          this_apsystem: 'DPA',
          code: code,
          new_pwd: newPwd,
          cfm_pwd: newPwdConfirm
        };

        vm.isSending = true;

        SecureAuth.doResetPwd(postParams)
          .then(function (resData) {
            handleErrCode(resData.err);
          }, function () {
            dialogs.notify('重設密碼失敗', '伺服器拒絕存取，請稍後再試。');
          }).finally(function () {
            vm.isSending = false;
          });
      }

      return false;
    }

    if (authCheck()) {
      SecureAuth.doLogout();
    }

    vm.doSubmit = doSubmit;

    return vm;
  }
}());

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

//# sourceMappingURL=secure-1-10-reset-pwd-controller.js.map

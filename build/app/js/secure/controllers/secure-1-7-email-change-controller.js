(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureEmailChangeCtrl', Ctrl);

  Ctrl.$inject = ['$state', '$translate', 'dialogs',
                  'APP_CONFIG', 'StorageAPI', 'InApiUtils', 'InApiValidator', 'ValidationSummary', 'SecureAuth'];

  function Ctrl($state, $translate, dialogs,
                APP_CONFIG, StorageAPI, InApiUtils, InApiValidator, ValidationSummary, SecureAuth) {
    var vm = this, userId = StorageAPI.getMyUserId() || '';

    vm.isSending = false;

    function authCheck() {
      if (!userId) {
        gotoLogin();
      }
    }

    function gotoLogin() {
      $state.go(APP_CONFIG.loginState);
    }

    function validateForm() {
      var newEmail = vm.newEmail || '', pwd = vm.pwd || '', summary = ValidationSummary;

      summary.clear();

      if (!newEmail || newEmail.length < 1) {
        summary.push('電子信箱不得為空');
      } else if (!InApiValidator.isValidEmail(newEmail)) {
        summary.push('電子信箱需符合 xxx@xxxx.xxx 格式');
      } else if (newEmail.length > 64) {
        summary.push('電子信箱長度不得超過 64 個字元');
      }

      if (!pwd || pwd.length < 1) {
        summary.push('密碼不得為空');
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
          dialogs.notify('更換註冊信箱成功', '已將認證信件寄至您的信箱<br />請於認證後再進行登入');
          gotoLogin();
          break;
        case '7000':
          dialogs.notify('更換註冊信箱失敗', '伺服器發生錯誤，請稍後再次提交表單。');
          break;
        case '7100':
          dialogs.notify('更換註冊信箱失敗', '提交資訊有誤。');
          vm.newEmail = vm.pwd = '';
          break;
        case '7123':
          dialogs.notify('更換註冊信箱失敗', '密碼錯誤。');
          vm.pwd = '';
          break;
        default:
          dialogs.notify(
            '更換註冊信箱失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}, 錯誤訊息：{1}', err.code, err.msg)
          );
      }
    }

    function doSubmit() {
      var newEmail, pwd, backUrl, postParams;

      if (validateForm()) {
        newEmail = (vm.newEmail || '').toLowerCase();
        pwd = vm.pwd || '';
        backUrl = SecureAuth.getUserVerifyBackUrl(userId);
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          this_user_id: userId,
          this_apsystem: 'DPA',
          pwd: pwd,
          new_email: newEmail,
          mail_subject: $translate.instant('CHANGE_MAIL_SUBJECT'),
          mail_content: InApiUtils.stringFormat($translate.instant('CHANGE_MAIL_CONTENT'), backUrl)
        };

        vm.isSending = true;

        SecureAuth.doChangeEmail(postParams)
          .then(function (resData) {
            handleErrCode(resData.err);
          }, function () {
            dialogs.notify('更換註冊信箱失敗', '伺服器拒絕存取，請稍後再試。');
          }).finally(function () {
            vm.isSending = false;
          });
      }

      return false;
    }

    authCheck();

    vm.doSubmit = doSubmit;

    return vm;
  }
}());

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

//# sourceMappingURL=secure-1-7-email-change-controller.js.map

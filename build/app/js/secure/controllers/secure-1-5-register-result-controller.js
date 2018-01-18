(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureRegisterResultCtrl', Ctrl);

  Ctrl.$inject = ['$state', '$translate', 'dialogs', 'APP_CONFIG', 'StorageAPI', 'InApiUtils', 'SecureAuth'];

  function Ctrl($state, $translate, dialogs, APP_CONFIG, StorageAPI, InApiUtils, SecureAuth) {
    var vm = this, userId = StorageAPI.getMyUserId() || '';

    vm.isSending = false;

    function authCheck() {
      if (!userId) {
        $state.go(APP_CONFIG.homeState);
      }
    }

    function handleErrCode(err) {
      err = err || {code: ''};

      switch (err.code) {
        case '0':
          dialogs.notify('重發認證信件成功', '已將認證信件寄至您的信箱<br />請於認證後再進行登入');
          break;
        case '7000':
          dialogs.notify('重發認證信件失敗', '伺服器發生錯誤，請稍後再次提交表單。');
          break;
        case '7100':
          dialogs.notify('重發認證信件失敗', '提交資訊有誤。');
          break;
        default:
          dialogs.notify('重發認證信件失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}, 錯誤訊息：{1}', err.code, err.msg));
      }
    }

    function doSubmit() {
      var backUrl, postParams;

      backUrl = SecureAuth.getUserVerifyBackUrl(userId);

      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      postParams = {
        this_user_id: userId,
        this_apsystem: 'DPA',
        mail_subject: $translate.instant('RESEND_REG_MAIL_SUBJECT'),
        mail_content: InApiUtils.stringFormat($translate.instant('RESEND_REG_MAIL_CONTENT'), backUrl)
      };

      vm.isSending = true;

      SecureAuth.doResendVerification(postParams)
        .then(function (resData) {
          handleErrCode(resData.err);
        }, function () {
          dialogs.notify('重發認證信件失敗', '伺服器拒絕存取，請稍後再試。');
        }).finally(function () {
          vm.isSending = false;
        });
    }

    function confirmToResend() {
      var msgContent = InApiUtils.stringFormat(
        '<div class="popup-text"><p>是否確定要重發認證信件至<br />[{0}]</p></div>',
        userId
      );

      dialogs.confirm('重發認證信件', msgContent)
        .result.then(function () {
          doSubmit();
        });
    }

    authCheck();

    vm.go = $state.go;
    vm.confirmToResend = confirmToResend;

    return vm;
  }
}());

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

//# sourceMappingURL=secure-1-5-register-result-controller.js.map

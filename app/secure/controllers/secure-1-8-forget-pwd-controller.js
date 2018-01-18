(function () {
  'use strict';

  angular.module('secure').controller('SecureForgetPwdCtrl', Ctrl);

  Ctrl.$inject = ['$state', '$translate', 'dialogs', 'vcRecaptchaService',
                  'APP_CONFIG', 'InApiUtils', 'ValidationSummary', 'SecureAuth'];

  function Ctrl($state, $translate, dialogs, vcRecaptchaService,
                APP_CONFIG, InApiUtils, ValidationSummary, SecureAuth) {
    var vm = this, reCaptchaWidgetId = '', isRecaptchaValid = false;

    vm.isSending = false;
    vm.siteKey = APP_CONFIG.reCaptchaSiteKey;

    function validateForm() {
      var un = vm.un || '', summary = ValidationSummary;

      summary.clear();

      if (!un || un.length < 1) {
        summary.push('帳號不得為空');
      }

      if (!isRecaptchaValid) {
        summary.push('請確實勾選"我不是機器人"核選方塊');
      }

      if (summary.count() > 0) {
        dialogs.notify('表單驗證有誤', summary.flush());
        return false;
      }

      return true;
    }

    function resetForm() {
      vm.un = '';
    }

    function handleErrCode(err) {
      err = err || {code: ''};

      switch (err.code) {
        case '0':
          dialogs.notify('忘記密碼申請成功', '已將申請信件寄至您的信箱<br />請於認證後再進行登入。');
          $state.go(APP_CONFIG.loginState);
          break;
        case 'r9001':
          dialogs.notify('忘記密碼申請失敗', '請確實勾選"我不是機器人"核選方塊');
          break;
        case '7000':
          dialogs.notify('忘記密碼申請失敗', '伺服器發生錯誤，請稍後再次提交表單。');
          break;
        case '7100':
          dialogs.notify('忘記密碼申請失敗', '提交資訊有誤。');
          resetForm();
          break;
        case '7110':
          dialogs.notify('忘記密碼申請失敗', '無此帳號，請重新輸入。');
          resetForm();
          break;
        default:
          dialogs.notify(
            '重發認證信件失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}, 錯誤訊息：{1}', err.code, err.msg)
          );
      }
    }

    function doSubmit() {
      var un, backUrl, postParams;

      if (validateForm()) {
        un = (vm.un || '').toLowerCase();
        backUrl = SecureAuth.getResetPwdBackUrl(un);
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          this_user_id: un,
          this_apsystem: 'DPA',
          'g-recaptcha-response': vm.gResponse || '',
          mail_subject: $translate.instant('FORGET_PWD_MAIL_SUBJECT'),
          mail_content: InApiUtils.stringFormat($translate.instant('FORGET_PWD_MAIL_CONTENT'), backUrl)
        };

        vm.isSending = true;

        SecureAuth.requestToChangePwd(postParams)
          .then(function (resData) {
            handleErrCode(resData.err);
          }, function () {
            dialogs.notify('忘記密碼申請失敗', '伺服器拒絕存取，請稍後再試。');
          }).finally(function () {
            vm.isSending = false;
            resetRecaptcha();
          });
      }

      return false;
    }

    function setWidgetId(widgetId) {
      reCaptchaWidgetId = widgetId;
    }

    function setRecaptchaIsChecked() {
      isRecaptchaValid = true;
    }

    function resetRecaptcha() {
      isRecaptchaValid = false;
      vcRecaptchaService.reload(reCaptchaWidgetId);
    }

    SecureAuth.doLogout();

    vm.doSubmit = doSubmit;
    vm.setWidgetId = setWidgetId;
    vm.setRecaptchaIsChecked = setRecaptchaIsChecked;
    vm.resetRecaptcha = resetRecaptcha;

    return vm;
  }
}());

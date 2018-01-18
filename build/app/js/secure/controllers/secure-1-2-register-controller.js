(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureRegisterCtrl', Ctrl);

  Ctrl.$inject = ['$document', '$state', '$translate', 'dialogs', 'vcRecaptchaService',
                  'APP_CONFIG', 'InApiUtils', 'InApiValidator', 'ValidationSummary', 'SecureAuth'];

  function Ctrl($document, $state, $translate, dialogs, vcRecaptchaService,
                APP_CONFIG, InApiUtils, InApiValidator, ValidationSummary, SecureAuth) {
    var vm = this, reCaptchaWidgetId = '', isRecaptchaValid = false;

    vm.isSending = false;
    vm.siteKey = APP_CONFIG.reCaptchaSiteKey;

    function validateForm() {
      var un = vm.un || '', email = vm.email || '', pwd = vm.pwd || '', pwdConfirmed = vm.pwdConfirmed || '',
          isAgreeWith = vm.isAgreeWith, summary = ValidationSummary;

      summary.clear();

      if (!un) {
        summary.push('帳號不得為空');
      } else {
        if (un.length < 6) {
          summary.push('帳號不得少於 6 個字');
        }

        if (!InApiValidator.isValidUn(un)) {
          summary.push('帳號僅允許英文或數字');
        }
      }

      if (!email || email.length < 1) {
        summary.push('電子信箱不得為空');
      } else if (!InApiValidator.isValidEmail(email)) {
        summary.push('電子信箱需符合 xxx@xxxx.xxx 格式');
      } else if (email.length > 64) {
        summary.push('電子信箱長度不得超過 64 個字元');
      }

      if (!pwd || pwd.length < 1) {
        summary.push('密碼不得為空');
      } else if (!InApiValidator.isValidPassword(pwd)) {
        summary.push('密碼須英數字混和');
      } else if (pwd.length < 8 || pwd.length > 12) {
        summary.push('密碼長度須介於 8 ~ 12');
      }

      if (!pwdConfirmed || pwdConfirmed.length < 1) {
        summary.push('確認密碼不得為空');
      } else if (pwd !== pwdConfirmed) {
        summary.push('密碼與確認密碼需相同');
      }

      if (!isAgreeWith) {
        summary.push('請閱讀並勾選"已閱讀並同意服務條款"');
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

    /* eslint complexity:0 */
    function handleErrCode(err) {
      err = err || {code: ''};

      switch (err.code) {
        case '0':
          dialogs.notify('註冊成功', '請至所註冊的信箱收取確認信，進行帳號開通。');
          vm.un = vm.email = vm.pwd = vm.pwdConfirmed = '';
          vm.isAgreeWith = false;
          $state.go('secure.register-result');
          break;
        case 'r9001':
          dialogs.notify('表單驗證失敗', '請確實勾選"我不是機器人"核選方塊');
          break;
        case '7000':
          dialogs.notify('註冊失敗', '伺服器發生錯誤，請稍後再次提交表單。');
          break;
        case '7002':
          dialogs.notify('註冊失敗', '操作失敗，請重新提交表單。');
          break;
        case '7003':
          dialogs.notify('註冊失敗', '操作不完全，請重新提交表單。');
          break;
        case '7109':
          dialogs.notify('註冊失敗', '密碼與確認密碼不相同，請檢查後重新輸入。');
          vm.pwd = vm.pwdConfirmed = '';
          break;
        case '7100':
          dialogs.notify('註冊失敗', '表單提交資訊有誤，請檢查後重新輸入。');
          break;
        case '7114':
          dialogs.notify('註冊失敗', '使用者帳號或信箱已被使用，請重新輸入。');
          vm.un = vm.email = '';
          break;
        default:
          dialogs.notify(
            '註冊失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}, 錯誤訊息：{1}', err.code, err.msg)
          );
          vm.un = vm.email = '';
          break;
      }
    }

    function doSubmit() {
      var userId, backUrl, postParams;

      if (validateForm()) {
        userId = vm.un.toLowerCase();
        backUrl = SecureAuth.getUserVerifyBackUrl(userId);
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          this_user_id: userId,
          this_apsystem: 'DPA',
          pwd: vm.pwd || '',
          cfm_pwd: vm.pwdConfirmed || '',
          email: vm.email.toLowerCase(),
          'g-recaptcha-response': vm.gResponse || '',
          mail_subject: $translate.instant('REGISTER_MAIL_SUBJECT'),
          mail_content: InApiUtils.stringFormat($translate.instant('REGISTER_MAIL_CONTENT'), backUrl)
        };

        vm.isSending = true;

        SecureAuth.doRegister(postParams)
          .then(function (resData) {
            handleErrCode(resData.err);
          }, function () {
            dialogs.notify('註冊失敗', '伺服器拒絕存取，請稍後再次提交表單。');
          }).finally(function () {
            vm.isSending = false;
            resetRecaptcha();
          });
      }

      return false;
    }

    function showUseOfTerms() {
      dialogs.notify('InAPI 使用條款', $document[0].getElementById('secure_1_4_template').innerHTML, {size: 'lg'});
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

    vm.doSubmit = doSubmit;
    vm.showUseOfTerms = showUseOfTerms;
    vm.setWidgetId = setWidgetId;
    vm.setRecaptchaIsChecked = setRecaptchaIsChecked;
    vm.resetRecaptcha = resetRecaptcha;

    return vm;
  }
}());

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

//# sourceMappingURL=secure-1-2-register-controller.js.map

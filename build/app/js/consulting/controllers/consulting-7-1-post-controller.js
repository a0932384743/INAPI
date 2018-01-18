(function () {
  'use strict';

  angular.module('consulting')
    .controller('ConsultingPostCtrl', Ctrl);

  Ctrl.$inject = ['dialogs', 'vcRecaptchaService',
                  'APP_CONFIG', 'InApiUtils', 'InApiValidator', 'ValidationSummary', 'ConsultingQuest'];

  function Ctrl(dialogs, vcRecaptchaService,
                APP_CONFIG, InApiUtils, InApiValidator, ValidationSummary, ConsultingQuest) {
    var vm = this, reCaptchaWidgetId = '', isRecaptchaValid = false;

    vm.isSending = false;
    vm.siteKey = APP_CONFIG.reCaptchaSiteKey;

    function validateForm() {
      var summary = ValidationSummary, email = vm.email || '', questType = vm.questType || '', descp = vm.descp || '';

      summary.clear();

      if (!email || email.length < 1) {
        summary.push('聯絡信箱不得為空');
      } else if (!InApiValidator.isValidEmail(email)) {
        summary.push('請輸入正確的聯絡信箱格式，例如：abc@tttmail.xyz');
      } else if (email.length > 64) {
        summary.push('聯絡信箱長度不得超過 64 個字元');
      }

      if (!questType || questType.length < 1) {
        summary.push('請選擇問題類型');
      }

      if (!descp || descp.length < 1) {
        summary.push('問題描述不得為空');
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
      vm.email = vm.questType = vm.descp = vm.snippet = '';
    }

    function handleErrCode(err) {
      err = err || {code: ''};

      switch (err.code) {
        case '0':
          dialogs.notify('問題送出成功', '您的諮詢信件已寄出，我們將儘快回覆您的問題至所指定信箱。');
          resetForm();
          break;
        case '7100':
          dialogs.notify('問題送出失敗', '驗證失敗，表單參數有誤，請確認後再行送出。');
          break;
        case 'r9001':
          dialogs.notify('問題送出失敗', '請確實勾選 "我不是機器人" 核選方塊');
          break;
        case 'r9002':
          dialogs.notify('問題送出失敗', '身份驗證不合法。');
          break;
        case 'r9100':
          dialogs.notify('問題送出失敗', '寄送信件發生錯誤，請稍後再試。');
          break;
        default:
          dialogs.notify(
            '問題送出失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}, 錯誤訊息：{1}', err.code, err.msg)
          );
          break;
      }
    }

    function doSumbit() {
      var postParams;

      if (validateForm()) {
        vm.isSending = true;
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          email: (vm.email || '').toLowerCase(),
          questType: vm.questType || '',
          descp: vm.descp || '',
          snippet: vm.snippet || '',
          'g-recaptcha-response': vm.gResponse || ''
        };

        ConsultingQuest.doPost(postParams)
          .then(function (resData) {
            handleErrCode(resData.err);
          }, function (resData) {
            if (resData && resData.err && resData.err.code === 'r8999') {
              dialogs.notify('身份驗證失敗', '安全金鑰已過期，請重新登入');
            } else {
              dialogs.notify('問題送出失敗', '伺服器發生問題，請稍後再試。');
            }
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

    vm.doSumbit = doSumbit;
    vm.setWidgetId = setWidgetId;
    vm.setRecaptchaIsChecked = setRecaptchaIsChecked;
    vm.resetRecaptcha = resetRecaptcha;

    return vm;
  }
}());

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

//# sourceMappingURL=consulting-7-1-post-controller.js.map

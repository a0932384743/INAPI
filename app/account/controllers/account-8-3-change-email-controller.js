(function () {
  'use strict';

  angular.module('account')
    .controller('ChangeEmailCtrl', Ctrl);

  Ctrl.$inject = ['dialogs', '$modalInstance', 'InApiUtils', 'InApiValidator', 'ValidationSummary', 'AccountDAO', 'data'];

  function Ctrl(dialogs, $modalInstance, InApiUtils, InApiValidator, ValidationSummary, AccountDAO, data) {
    var vm = this;

    vm.isSending = false;
    vm.userEmail = data.userEmail;

    function validateForm() {
      var newEmail = vm.newEmail || '', newEmailConfirm = vm.newEmailConfirm || '', pwd = vm.pwd || '',
          summary = ValidationSummary;

      summary.clear();

      if (!newEmail || newEmail.length < 1) {
        summary.push('新電子信箱不得為空');
      } else if (!InApiValidator.isValidEmail(newEmail)) {
        summary.push('新電子信箱需符合 xxx@xxxx.xxx 格式');
      } else if (newEmail.length > 64) {
        summary.push('新電子信箱長度不得超過 64 個字元');
      }

      if (!newEmailConfirm || newEmailConfirm.length < 1) {
        summary.push('確認新電子信箱不得為空');
      } else if (newEmailConfirm !== newEmail) {
        summary.push('確認新電子信箱必須與新電子信箱一致');
      }

      if (!pwd || pwd.length < 1) {
        summary.push('密碼不得為空');
      }

      if (summary.count() > 0) {
        dialogs.notify('表單驗證錯誤', summary.flush());
        return false;
      }

      return true;
    }

    function handleErrCode(err) {
      err = err || {code: ''};

      switch (err.code) {
        case '7000':
          dialogs.notify('修改電子信箱失敗', '系統發生錯誤，請稍後再試。');
          break;
        case '7100':
          dialogs.notify('修改電子信箱失敗', '表單參數有誤，請確認後再行送出。');
          break;
        default:
          dialogs.notify(
            '修改電子信箱失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}<br/>錯誤訊息：{1}', err.code, err.msg)
          );
          break;
      }
    }

    function cancel() {
      $modalInstance.dismiss('close');
    }

    function doSubmit() {
      if (validateForm()) {
        vm.isSending = true;

        AccountDAO.doChangeUserEmail(vm.newEmail, vm.pwd)
          .then(function (email) {
            // 將資料回傳主視窗
            $modalInstance.close(email);
          }, function (resData) {
            handleErrCode(resData.err);
          }).finally(function () {
            vm.isSending = false;
          });
      }

      return false;
    }

    vm.cancel = cancel;
    vm.doSubmit = doSubmit;

    return vm;
  }
}());

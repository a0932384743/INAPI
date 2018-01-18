(function () {
  'use strict';

  angular.module('account')
    .controller('ChangeUserNameCtrl', Ctrl);

  Ctrl.$inject = ['dialogs', '$modalInstance', 'InApiUtils', 'ValidationSummary', 'AccountDAO', 'data'];

  function Ctrl(dialogs, $modalInstance, InApiUtils, ValidationSummary, AccountDAO, data) {
    var vm = this;

    vm.isSending = false;
    vm.userName = data.userName;

    function validateForm() {
      var userName = vm.userName || '', summary = ValidationSummary;

      summary.clear();

      if (!userName || userName.length < 1) {
        summary.push('用戶名稱不得為空');
      } else if (userName.length > 20) {
        summary.push('用戶名稱不得超過 20 個字');
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
          dialogs.notify('修改使用者名稱失敗', '系統發生錯誤，請稍後再試。');
          break;
        case '7100':
          dialogs.notify('修改使用者名稱失敗', '表單參數有誤，請確認後再行送出。');
          break;
        default:
          dialogs.notify(
            '修改使用者名稱失敗',
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

        AccountDAO.doChangeUserName(vm.userName)
          .then(function (userName) {
            // 將資料回傳主視窗
            $modalInstance.close(userName);
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

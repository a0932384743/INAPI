(function () {
  'use strict';

  angular.module('account')
    .controller('ChangePwdCtrl', Ctrl);

  Ctrl.$inject = ['$state', 'dialogs', '$modalInstance',
                  'InApiUtils', 'InApiValidator', 'ValidationSummary', 'AccountDAO', 'data'];

  function Ctrl($state, dialogs, $modalInstance,
                InApiUtils, InApiValidator, ValidationSummary, AccountDAO, data) {
    var vm = this;

    vm.isSending = false;
    vm.userEmail = data.userEmail;

    function validateForm() {
      var pwd = vm.pwd || '', newPwd = vm.newPwd || '', newPwdConfirm = vm.newPwdConfirm || '',
          summary = ValidationSummary;

      summary.clear();

      if (!pwd || pwd.length < 1) {
        summary.push('舊密碼不得為空');
      }

      if (!newPwd || newPwd.length < 1) {
        summary.push('新密碼不得為空');
      } else if (!InApiValidator.isValidPassword(newPwd)) {
        summary.push('新密碼須英數字混和');
      } else if (newPwd.length < 8 || newPwd.length > 12) {
        summary.push('新密碼長度須介於 8 ~ 12');
      }

      if (!newPwdConfirm || newPwdConfirm.length < 1) {
        summary.push('確認密碼不得為空');
      } else if (newPwdConfirm !== newPwd) {
        summary.push('新密碼與確認密碼必須一致');
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
        case '0':
          dialogs.notify('修改密碼成功', '請使用新密碼登入');
          $state.go('secure.logout');
          break;
        case '7000':
          dialogs.notify('修改密碼失敗', '系統發生錯誤，請稍後再試。');
          break;
        case '7100':
          dialogs.notify('修改密碼失敗', '表單參數有誤，請確認後再行送出。');
          break;
        case '7104':
          dialogs.notify('修改密碼失敗', '舊密碼錯誤，請輸入正確密碼。');
          break;
        default:
          dialogs.notify(
            '修改密碼失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}<br/>錯誤訊息：{1}', err.code, err.msg)
          );
          break;
      }
    }

    function cancel() {
      $modalInstance.dismiss('close');
    }

    function doSubmit(thisForm) {
      if (validateForm(thisForm)) {
        vm.isSending = true;

        AccountDAO.doChangeUserPwd(vm.pwd, vm.newPwd)
          .then(function (resData) {
            cancel();
            handleErrCode(resData.err);
          }, function () {
            cancel();
            dialogs.notify('修改密碼失敗', '系統發生錯誤，請稍後再試');
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

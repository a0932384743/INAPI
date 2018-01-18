(function () {
  'use strict';

  angular.module('devicelog')
    .controller('AddResourceCtrl', Ctrl);

  Ctrl.$inject = ['dialogs', '$modalInstance', 'InApiUtils', 'ValidationSummary', 'ResourceDAO', 'data'];

  function Ctrl(dialogs, $modalInstance, InApiUtils, ValidationSummary, ResourceDAO, data) {
    var vm = this;

    vm.un = data.un || '';
    vm.lockUn = vm.un ? true : false;
    vm.isSending = false;

    function validateForm() {
      var un = vm.un || '', pwd = vm.pwd || '', summary = ValidationSummary;

      summary.clear();

      if (!un) {
        summary.push('擁有者帳號不得為空');
      }

      if (!pwd) {
        summary.push('擁有者密碼不得為空');
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
        case '400':
          dialogs.notify('授權失敗', '密碼有誤，請重新輸入。');
          vm.pwd = '';
          break;
        case '7000':
          dialogs.notify('授權失敗', '伺服器發生錯誤');
          break;
        case '7100':
          dialogs.notify('授權失敗', '表單參數有誤，請確認後再行送出。');
          break;
        default:
          dialogs.notify(
            '授權失敗',
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

        ResourceDAO.doLogin(vm.un, vm.pwd)
          .then(function (res) {
            // 將資料回傳主視窗
            dialogs.notify('新增成功', '已取得資源擁有者授權');
            $modalInstance.close(res.un);
          }, function (resData) {
            handleErrCode(resData.err);
          })
          .finally(function () {
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

(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureLoginCtrl', Ctrl);

  Ctrl.$inject = ['$state', 'dialogs', 'base64', 'APP_CONFIG', 'StorageAPI', 'ValidationSummary', 'SecureAuth'];

  function Ctrl($state, dialogs, base64, APP_CONFIG, StorageAPI, ValidationSummary, SecureAuth) {
    var vm = this;

    function init() {
      vm.isSending = false;
      vm.un = base64.decode(StorageAPI.read('un') || '');

      if (vm.un) {
        vm.flagRememberMe = true;
      }
    }

    function resetForm() {
      if (!vm.flagRememberMe) {
        vm.un = '';
      }
      vm.pwd = '';
    }

    function validateForm() {
      var un = vm.un || '', pwd = vm.pwd || '', summary = ValidationSummary;

      summary.clear();

      if (!un || un.length < 1) {
        summary.push('帳號不得為空');
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

    function doSubmit() {
      var un, pwd;

      if (!validateForm()) {
        return false;
      }

      un = vm.un || '';
      pwd = vm.pwd || '';

      if (vm.flagRememberMe) {
        StorageAPI.write('un', base64.encode(un));
      } else {
        StorageAPI.write('un', null);
      }

      vm.isSending = true;

      SecureAuth.doLogin(un, pwd)
        .then(function (data) {
          var returnState = '';
          if (data && data.err && data.err.code === 'auth.success.0001') {
            returnState = StorageAPI.getReturnState();

            if (returnState) {
              $state.go(returnState);
              StorageAPI.setReturnState(null);
            } else {
              $state.go(APP_CONFIG.firstStateAfterLogin);
            }
          }
        }, function (data) {
          if (data && data.err && data.err.code === 'auth.failure.0002') {
            $state.go('secure.register-disabled');
          } else {
            dialogs.notify('登入失敗', '<p>帳號或密碼錯誤，</p><p>請確認後再次提交。</p>');
            resetForm();
          }
        }).finally(function () {
          vm.isSending = false;
        });

      return false;
    }

    init();

    vm.doSubmit = doSubmit;

    return vm;
  }
}());

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

//# sourceMappingURL=secure-1-3-login-controller.js.map

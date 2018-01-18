(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureUserVerifySuccessCtrl', Ctrl);

  Ctrl.$inject = ['$state', 'APP_CONFIG', 'StorageAPI'];

  function Ctrl($state, APP_CONFIG, StorageAPI) {
    var vm = this;

    function authCheck() {
      if (!StorageAPI.getFlagUserVerified()) {
        $state.go(APP_CONFIG.homeState);
      }

      StorageAPI.setFlagUserVerified(false);
    }

    function gotoLogin() {
      $state.go(APP_CONFIG.loginState);
    }

    authCheck();

    vm.gotoLogin = gotoLogin;

    return vm;
  }
}());

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

//# sourceMappingURL=secure-1-11-user-verify-success-controller.js.map

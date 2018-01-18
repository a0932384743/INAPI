(function () {
  'use strict';

  angular.module('secure')
    .controller('SecureLogoutCtrl', Ctrl);

  Ctrl.$inject = ['$state', 'APP_CONFIG', 'SecureAuth'];

  function Ctrl($state, APP_CONFIG, SecureAuth) {
    var vm = this;

    SecureAuth.doLogout();
    $state.go(APP_CONFIG.homeState);

    return vm;
  }
}());

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

//# sourceMappingURL=secure-logout-controller.js.map

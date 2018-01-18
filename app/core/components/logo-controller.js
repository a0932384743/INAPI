(function () {
  'use strict';

  angular.module('core')
    .controller('LogoCtrl', Ctrl);

  Ctrl.$inject = ['$state', 'APP_CONFIG'];

  function Ctrl($state, APP_CONFIG) {
    var vm = this;

    function goHome() {
      $state.go(APP_CONFIG.homeState);
    }

    vm.goHome = goHome;

    return vm;
  }
}());

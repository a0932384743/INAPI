(function () {
  'use strict';

  angular.module('core')
    .controller('CoreHomeCtrl', Ctrl);

  Ctrl.$inject = ['$state'];

  function Ctrl($state) {
    var vm = this;

    vm.go = $state.go;

    return vm;
  }
}());

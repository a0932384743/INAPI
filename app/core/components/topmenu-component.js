(function () {
  'use strict';

  angular.module('core')
    .component('inapiTopMenu', {
      templateUrl: 'core/components/topmenu-component.tpl.html',
      controller: 'TopMenuCtrl',
      controllerAs: 'vm',
      bindings: {
        menuId: '@'
      }
    });
}());

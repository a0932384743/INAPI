(function () {
  'use strict';

  angular.module('navigation')
    .component('leftMenu', {
      templateUrl: 'navigation/components/navigation-left-menu-component.tpl.html',
      controller: 'NavigationLeftMenuCtrl',
      controllerAs: 'vm',
      bindings: {
        menuId: '@'
      }
    });
}());

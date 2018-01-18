(function () {
  'use strict';

  angular.module('core')
    .controller('NavigationLeftMenuCtrl', Ctrl);

  function Ctrl() {
    var vm = this;

    function highLightThis(menuId) {
      if (vm.menuId === menuId) {
        return 'active';
      }
    }

    vm.highLightThis = highLightThis;

    return vm;
  }
}());

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

//# sourceMappingURL=navigation-left-menu-controller.js.map

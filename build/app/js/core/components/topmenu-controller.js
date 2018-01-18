(function () {
  'use strict';

  angular.module('core')
    .controller('TopMenuCtrl', Ctrl);

  Ctrl.$inject = ['$scope', 'AccountDAO'];

  function Ctrl($scope, AccountDAO) {
    var vm = this;

    vm.isPanelOpened = false;

    function getDisplayName() {
      AccountDAO.getMyInfo()
        .then(function (me) {
          vm.userTitle = me.userName || me.userId;
        });
    }

    function highLightThis(menuId) {
      if (vm.menuId === menuId) {
        return 'active';
      }
    }

    function toggleUserPanel() {
      vm.isPanelOpened = !vm.isPanelOpened;
    }

    getDisplayName();

    $scope.$on('change:userDisplayName', function () {
      getDisplayName();
    });

    vm.highLightThis = highLightThis;
    vm.toggleUserPanel = toggleUserPanel;

    return vm;
  }
}());

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

//# sourceMappingURL=topmenu-controller.js.map

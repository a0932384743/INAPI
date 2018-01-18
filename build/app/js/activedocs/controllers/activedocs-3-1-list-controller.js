(function () {
  'use strict';

  angular.module('activedocs')
    .controller('ActivedocsListCtrl', Ctrl);

  Ctrl.$inject = ['$timeout', '$sce', 'APP_CONFIG'];

  function Ctrl($timeout, $sce, APP_CONFIG) {
    var vm = this;

    vm.docUrl = trustSrc(APP_CONFIG.apiSvrUrl + '/doc/active_doc.html');
    vm.isLoading = true;

    function trustSrc(src) {
      return $sce.trustAsResourceUrl(src);
    }

    function predictIframeLoaded(contentLoaded) {
      $timeout(function () {
        vm.isLoading = !contentLoaded;
      }, 10);
    }

    vm.predictIframeLoaded = predictIframeLoaded;

    return vm;
  }
}());

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

//# sourceMappingURL=activedocs-3-1-list-controller.js.map

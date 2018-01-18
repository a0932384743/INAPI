(function () {
  'use strict';

  angular.module('download')
    .controller('DownloadListCtrl', Ctrl);

  Ctrl.$inject = ['dialogs', 'DownLoadLinkDAO'];

  function Ctrl(dialogs, DownLoadLinkDAO) {
    var vm = this;

    vm.docDS = {
      data: [],
      columnDefs: [],
      enableColumnMenus: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 2
    };

    vm.emulatorDS = {
      data: [],
      columnDefs: [],
      enableColumnMenus: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 2
    };

    function init() {
      DownLoadLinkDAO.getDocUrlsList()
        .then(function (res) {
          var gridConfig;

          if (res && res.data) {
            gridConfig = res.data;
            vm.docDS.columnDefs = gridConfig.columnDefs;
            vm.docDS.data = gridConfig.data;
          } else {
            dialogs.notify('查詢錯誤', '無法取得文件下載列表');
          }
        });

      DownLoadLinkDAO.getEmulatorUrlsList()
        .then(function (res) {
          var gridConfig;

          if (res && res.data) {
            gridConfig = res.data;
            vm.emulatorDS.columnDefs = gridConfig.columnDefs;
            vm.emulatorDS.data = gridConfig.data;
          } else {
            dialogs.notify('查詢錯誤', '無法取得模擬器下載列表');
          }
        });
    }

    init();

    return vm;
  }
}());

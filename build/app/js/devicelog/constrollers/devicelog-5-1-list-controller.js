(function () {
  'use strict';

  angular.module('devicelog')
    .controller('DevicelogListCtrl', Ctrl);

  Ctrl.$inject = ['$scope', '$filter', '$state', '$stateParams', 'dialogs',
                  'InApiUtils', 'AccountDAO', 'ResourceDAO', 'ResourceDialog', 'DeviceDAO', 'DeviceProfile'];

  function Ctrl($scope, $filter, $state, $stateParams, dialogs,
                InApiUtils, AccountDAO, ResourceDAO, ResourceDialog, DeviceDAO, DeviceProfile) {
    var vm = this, devicesCache = [];

    vm.flagShowResource = false;
    vm.isLoading = false;

    // reference to: http://ui-grid.info/docs/#/tutorial/305_appScope
    vm.resourceListOpt = {
      data: [],
      columnDefs: [
        {field: 'seqNo', displayName: '編號', width: '10%', cellClass: 'ui-grid-center'},
        {field: 'un', displayName: '資源擁有者', width: '70%'},
        {
          name: 'deleteBtn',
          displayName: '刪除',
          width: '10%',
          cellClass: 'ui-grid-center',
          cellTemplate: '<img class="btn-like" src="images/InAPI_5_delectIcon.png" alt="刪除" data-ng-click="grid.appScope.confimResourceDelete(row.entity.un, $event)" />'
        }
      ],
      // 一定要設定否則 grid.appScope 會預設抓取 $scope
      appScopeProvider: vm,
      enableColumnMenus: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 2,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      enableSelectAll: false,
      multiSelect: false,
      onRegisterApi: function (gridApi) {
        vm.resourceGridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, chooseResourceAccount);
      }
    };

    vm.deviceListOpt = {
      data: [],
      columnDefs: [
        {field: 'devLinkType', displayName: '聯網類別', width: '15%'},
        {field: 'devId', displayName: '裝置ID', width: '30%'},
        {field: 'instanceType', displayName: '型態', width: '10%'},
        {field: 'devTypeName', displayName: '裝置類別', width: '15%'},
        {field: 'connectedState', displayName: '連線狀態', width: '10%'},
        {
          name: 'detailBtn',
          displayName: '日誌',
          width: '10%',
          cellTemplate: '<img class="btn-like" src="images/InAPI_5_chartIcon.png" alt="明細" data-ng-if="row.entity.hasDevLog" data-ng-click="grid.appScope.goDetail(row.entity.devId, row.entity.devCategory)" />'
        }
      ],
      // 一定要設定否則 grid.appScope 會預設抓取 $scope
      appScopeProvider: vm,
      enableColumnMenus: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 2,
      enablePaginationControls: false,
      paginationPageSize: 15,
      onRegisterApi: function (gridApi) {
        vm.deviceGridApi = gridApi;
      }
    };

    function init() {
      AccountDAO.getMyInfo()
        .then(function (me) {
          getResourceAccounts(me.userId);
        }, function () {
          dialogs.notify('取得資料失敗', '無法取得您的資料，請重整頁面。');
        });

      listDevices();
    }

    function getResourceAccounts() {
      ResourceDAO.getResourceList()
        .then(function (resourcList) {
          var i, cnt = resourcList ? resourcList.length : 0;

          for (i = 0; i < cnt; ++i) {
            addResourceRow(resourcList[i].userId);
          }
        }, function (resData) {
          dialogs.notify(
            '取得資源列表失敗',
            InApiUtils.stringFormat('發生未知錯誤，錯誤代碼：{0}<br/>錯誤訊息：{1}', resData.err.code, resData.err.msg)
          );
        });
    }

    function chooseResourceAccount(row) {
      var un;

      if (row && row.entity && row.entity.un && row.isSelected) {
        un = row.entity.un;
        vm.deviceListOpt.bindUn = un;
        listDevices(un, true);
      }
    }

    function listDevices(un, flagReload) {
      vm.isLoading = true;

      DeviceDAO.getDeviceList(un, 1, 50, flagReload)
          .then(function (resData) {
            vm.qryDeviceId = '';

            if (resData && resData.devices && resData.devices.length > 0) {
              devicesCache = InApiUtils.camelizeObj(resData.devices);
              devicesCache = DeviceProfile.formatProfiles(devicesCache);
              vm.deviceListOpt.data = devicesCache;
            } else {
              vm.deviceListOpt.data = devicesCache = [];
            }
          }, function (res) {
            var err;

            if (res && res.err) {
              err = res.err;

              if (err.code === 'r8999') {
                getResourceAuth(un);

                if (vm.resourceGridApi) {
                  vm.resourceGridApi.selection.clearSelectedRows();
                }
              } else {
                dialogs.notify(
                  '取得裝置列表失敗',
                  InApiUtils.stringFormat('無法取得裝置列表，錯誤代碼：{0}<br/>錯誤訊息：{1}', err.code, err.msg)
                );
              }
            } else {
              dialogs.notify('取得裝置列表失敗', '無法取得裝置列表');
            }

            vm.deviceListOpt.data = devicesCache = [];
          }).finally(function () {
            vm.isLoading = false;
          });
    }

    function refreshResourceIndex() {
      var i, cnt;

      vm.resourceListOpt.data = vm.resourceListOpt.data || [];
      cnt = vm.resourceListOpt.data.length;

      for (i = 0; i < cnt; ++i) {
        vm.resourceListOpt.data[i].seqNo = i + 1;
      }
    }

    function addResourceRow(un) {
      var i, rowData;

      if (!un) {
        return;
      }

      vm.resourceListOpt.data = vm.resourceListOpt.data || [];

      // escape when un has been in the list
      for (i in vm.resourceListOpt.data) {
        if (vm.resourceListOpt.data[i].un === un) {
          return;
        }
      }

      rowData = {
        seqNo: vm.resourceListOpt.data.length + 1,
        un: un
      };

      vm.resourceListOpt.data.push(rowData);
    }

    function deleteResourceRow(un) {
      var i, cnt = vm.resourceListOpt.data ? vm.resourceListOpt.data.length : 0;

      for (i = 0; i < cnt; ++i) {
        if (vm.resourceListOpt.data[i].un === un) {
          vm.resourceListOpt.data.splice(i, 1);
          break;
        }
      }
    }

    function handleDelErrCode(err, un) {
      err = err || {code: ''};

      switch (err.code) {
        case '0':
          dialogs.notify('刪除成功', '已移除資源擁有者授權');
          deleteResourceRow(un);
          refreshResourceIndex();
          if (vm.deviceListOpt.bindUn === un) {
            vm.deviceListOpt.data = [];
            vm.deviceListOpt.bindUn = null;
          }
          break;
        default:
          dialogs.notify(
            '刪除失敗',
            InApiUtils.stringFormat('刪除資源發生錯誤，錯誤代碼：{0}<br/>錯誤訊息：{1}', err.code, err.msg)
          );
          break;
      }
    }

    function toggleResourceList() {
      vm.flagShowResource = !vm.flagShowResource;
    }

    function getResourceAuth(un) {
      un = un || '';

      ResourceDialog.showAuthentication(un)
        .then(function (resUn) {
          addResourceRow(resUn);
        });
    }

    function confimResourceDelete(un, evt) {
      evt.stopPropagation();

      if (!un) {
        return;
      }

      dialogs.confirm('刪除資源存取', InApiUtils.stringFormat('是否確定要刪除以下資源存取[{0}]', un))
        .result.then(function () {
          ResourceDAO.deleteResource(un)
            .then(function (resData) {
              handleDelErrCode(resData.err, un);
            }, function () {
              dialogs.notify('刪除失敗', '伺服器發生錯誤，請稍後再試');
            });
        });
    }

    function doSearchDevice() {
      var data = angular.merge([], devicesCache);

      vm.deviceListOpt.data = $filter('filter')(data, {devId: vm.qryDeviceId});
    }

    function clearQueryId() {
      if (!vm.qryDeviceId) {
        vm.deviceListOpt.data = devicesCache;
      }
    }

    function getEmptyArray(total) {
      total = parseInt(total, 10) || 1;

      return new Array(total);
    }

    function getPageClass(i) {
      if (i + 1 === vm.deviceGridApi.pagination.getPage()) {
        return 'active';
      }

      return '';
    }

    function goDetail(devId, devCategory) {
      $state.go('devicelog.detail', {un: vm.deviceListOpt.bindUn, devId: devId, devCategory: devCategory});
    }

    init();

    vm.toggleResourceList = toggleResourceList;
    vm.getResourceAuth = getResourceAuth;
    vm.confimResourceDelete = confimResourceDelete;
    vm.doSearchDevice = doSearchDevice;
    vm.clearQueryId = clearQueryId;
    vm.getEmptyArray = getEmptyArray;
    vm.getPageClass = getPageClass;
    vm.goDetail = goDetail;

    return vm;
  }
}());

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

//# sourceMappingURL=devicelog-5-1-list-controller.js.map

(function () {
  'use strict';

  angular.module('devicelog')
    .controller('DevicelogDetailCtrl', Ctrl);

  Ctrl.$inject = ['$scope', '$state', '$stateParams', 'dialogs', 'moment', 'ValidationSummary', 'TableauDAO'];

  function Ctrl($scope, $state, $stateParams, dialogs, moment, ValidationSummary, TableauDAO) {
    var vm = this, devId, devCategory, measureValue;

    if (!validateParams($stateParams)) {
      dialogs.notify('查詢失敗', '帶入裝置 ID 或裝置類別錯誤');
      $state.go('devicelog.list');
      return vm;
    }

    devId = $stateParams.devId;
    devCategory = $stateParams.devCategory;

    vm.devId = devId;
    vm.devCategory = devCategory;
    vm.tableauFilters = {};
    vm.measureOptions = TableauDAO.getMeasureOptions(devCategory);
    vm.timeFilterS = moment().startOf('hour');
    vm.timeFilterE = moment().startOf('hour').add(1, 'hour');

    function validateParams(stateParams) {
      var categories = ['OUTLET', 'SENSOR'];

      if (!stateParams || !stateParams.devId || !stateParams.devCategory || categories.indexOf(stateParams.devCategory) < 0) {
        return false;
      }

      return true;
    }

    function validateForm() {
      var summary = ValidationSummary;

      summary.clear();

      if (!vm.measureParam) {
        summary.push('請選擇量測參數');
      }

      if (!vm.timeFilterS || vm.timeFilterS === true) {
        summary.push('請選擇起始時間');
      }

      if (!vm.timeFilterE || vm.timeFilterE === true) {
        summary.push('請選擇結束時間');
      }

      if (summary.count() > 0) {
        dialogs.notify('表單驗證有誤', summary.flush());
        return false;
      }

      return true;
    }

    function applyFiltersToTableau() {
      var reportTimeMin = vm.timeFilterS.format('YYYY-MM-DD HH:mm:ss'),
          reportTimeMax = vm.timeFilterE.format('YYYY-MM-DD HH:mm:ss');

      measureValue = vm.measureParam.value;

      if (devCategory === 'OUTLET') {
        vm.tableauFilters = {
          olid: devId,
          reporttime: {
            min: reportTimeMin,
            max: reportTimeMax
          }
        };
      } else {
        vm.tableauFilters = {
          deviceid: devId,
          attrid: measureValue,
          reporttime: {
            min: reportTimeMin,
            max: reportTimeMax
          }
        };
      }
    }

    function goList() {
      $state.go('devicelog.list');
    }

    function doQuery() {
      if (validateForm()) {
        vm.qryMeasureLabel = vm.measureParam.label;
        vm.qryTimeFilterSLabel = vm.timeFilterS.format('YYYY-MM-DD HH:mm');
        vm.qryTimeFilterELabel = vm.timeFilterE.format('YYYY-MM-DD HH:mm');

        if (measureValue !== vm.measureParam.value) {
          TableauDAO.getTableauQueryUrl(devCategory, vm.measureParam)
            .then(function (url) {
              vm.tableauUrl = url;
              applyFiltersToTableau();
            });
        } else {
          applyFiltersToTableau();
        }
      }
    }

    function adjustStartTimeMinMax() {
      vm.timeFilterSMax = moment().startOf('hour');
    }

    function adjustEndTimeMinMax() {
      var now, maxTime;

      now = moment().startOf('hour').add(1, 'hour');
      maxTime = moment.isMoment(vm.timeFilterS) ? vm.timeFilterS.clone().startOf('hour').add(14, 'day') : now;

      vm.timeFilterEMin = moment.isMoment(vm.timeFilterS) ? vm.timeFilterS.clone().startOf('hour').add(1, 'hour') : null;
      vm.timeFilterEMax = now.diff(maxTime, 'hour') > 0 ? maxTime : now;
    }

    $scope.$watch('vm.timeFilterS._d', function () {
      adjustEndTimeMinMax();
      vm.timeFilterE = moment.isMoment(vm.timeFilterS) ? vm.timeFilterS.clone().startOf('hour').add(1, 'hour') : null;
    }, true);

    vm.goList = goList;
    vm.doQuery = doQuery;
    vm.adjustStartTimeMinMax = adjustStartTimeMinMax;
    vm.adjustEndTimeMinMax = adjustEndTimeMinMax;

    return vm;
  }
}());

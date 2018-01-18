(function () {
  'use strict';

  angular.module('devicelog')
    .factory('TableauDAO', TableauDAO);

  TableauDAO.$inject = ['$http', '$q', 'dialogs', 'APP_CONFIG', 'InApiUtils'];

  function TableauDAO($http, $q, dialogs, APP_CONFIG, InApiUtils) {
    var service = {};

    function getTicket() {
      var defer = $q.defer();

      $http.get(APP_CONFIG.tableauTicketUrl)
        .then(function (res) {
          if (res && res.data && res.data.ticket) {
            defer.resolve(res.data.ticket);
          } else {
            dialogs.notify('讀取失敗', '無法由伺服器取得 ticket, 請稍後再試。');
          }
        }, function () {
          dialogs.notify('讀取失敗', '無法由伺服器取得 ticket, 請稍後再試。');
        });

      return defer.promise;
    }

    function getTableauQueryUrl(devCategory, measure) {
      var defer = $q.defer(), url;

      getTicket().then(function (ticket) {
        if (devCategory === 'OUTLET') {
          url = APP_CONFIG.tableauQueryUrl +
            InApiUtils.stringFormat('/{0}/views/{1}InAPI_Outlet_Workbook/{2}Dashboard' +
              '?:tooltip=yes&:refresh=no&:record_performance=no&:revert=all',
              ticket, APP_CONFIG.tableauWorkbookPrefix, measure.value);
        } else if (devCategory === 'SENSOR') {
          url = APP_CONFIG.tableauQueryUrl +
            InApiUtils.stringFormat('/{0}/views/{1}InAPI_SensorAttr{2}_Workbook/SensorAttr{2}Dashboard' +
              '?:tooltip=yes&:refresh=no&:record_performance=no&:revert=all',
              ticket, APP_CONFIG.tableauWorkbookPrefix, measure.dataType);
        }

        defer.resolve(url);
      });

      return defer.promise;
    }

    function getMeasureOptions(devCategory) {
      var options = [];

      devCategory = devCategory ? devCategory.toLowerCase() : '';

      switch (devCategory) {
        case 'sensor':
          options = [
            {dataType: 'Number', value: '400100', label: '溫度'},
            {dataType: 'Number', value: '400200', label: '濕度'},
            {dataType: 'Number', value: '102100', label: '警報模式'},
            {dataType: 'String', value: '101800', label: '電池存量狀態'},
            {dataType: 'Number', value: '110500', label: '移動狀態'},
            {dataType: 'Number', value: '100010039', label: '電池存量事件'},
            {dataType: 'Number', value: '100030090', label: '紅外線移動偵測事件'}
          ];
          break;
        case 'outlet':
          options = [
            {value: 'Voltage', label: '電壓'},
            {value: 'Current', label: '電流'},
            {value: 'Frequency', label: '頻率'},
            {value: 'PowerFactor', label: '功率因數'},
            {value: 'ActivePower', label: '實功率'},
            {value: 'ApparentPower', label: '視在功率'},
            {value: 'MainEnergy', label: '累積電量'},
            {value: 'NegativeEnergy', label: '反向累積電量'},
            {value: 'ShortMainEnergy', label: '短期累積電量'},
            {value: 'ShortNegativeEnergy', label: '短期反向累積電量'},
            {value: 'ShortTime', label: '使用時間'},
            {value: 'RelayStatus', label: '電源狀態'}
          ];
          break;
        default:
          options = [];
      }

      return options;
    }

    service.getMeasureOptions = getMeasureOptions;
    service.getTableauQueryUrl = getTableauQueryUrl;

    return service;
  }
}());

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

//# sourceMappingURL=tableau-dao-factory.js.map

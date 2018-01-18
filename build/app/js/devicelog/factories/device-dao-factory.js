(function () {
  'use strict';

  angular.module('devicelog')
    .factory('DeviceDAO', DeviceDAO);

  DeviceDAO.$inject = ['$q', 'InApiUtils', 'DataAdapter'];

  function DeviceDAO($q, InApiUtils, DataAdapter) {
    var service = {}, apiUrls, devicesPageInfoList = {}, devicesInfoCache = {}, MAX_PAGE_SIZE = 50;

    apiUrls = {
      deviceList: '/api/ifa/1/device/list'
    };

    function getDeviceList(un, pageNbr, pageSize, flagReload) {
      var defer = $q.defer(), urlParams, devicesPageInfo;

      devicesPageInfo = devicesPageInfoList[un] || {};

      if (!un && devicesInfoCache && devicesInfoCache.devices && devicesInfoCache.devices.length > 0) {
        defer.resolve(devicesInfoCache);
      } else if (devicesPageInfo.devices && devicesPageInfo.devices.length > 0 && !flagReload) {
        defer.resolve(devicesPageInfo);
      } else if (un) {
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        urlParams = {
          apsystem: 'IFA',
          user_id: un,
          limit: parseInt(pageSize, 10) || MAX_PAGE_SIZE,
          page_number: parseInt(pageNbr, 10) || 1
        };

        DataAdapter.requestApiSvrPassword(un, 'GET', apiUrls.deviceList, urlParams)
          .then(function (resData) {
            if (resData && resData.err && resData.err.code === '0') {
              resData = InApiUtils.camelizeObj(resData);
              devicesPageInfoList[un] = resData;
              devicesInfoCache = resData;
              defer.resolve(resData);
            } else {
              defer.reject(resData);
            }
          }, function (resData) {
            defer.reject(resData);
          });
      } else {
        defer.resolve({
          devices: []
        });
      }

      return defer.promise;
    }

    function destroy() {
      devicesPageInfoList = {};
      devicesInfoCache = {};
    }

    service.getDeviceList = getDeviceList;
    service.destroy = destroy;

    return service;
  }
}());

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

//# sourceMappingURL=device-dao-factory.js.map

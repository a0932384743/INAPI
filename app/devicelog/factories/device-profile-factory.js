(function () {
  'use strict';

  angular.module('devicelog')
    .factory('DeviceProfile', DeviceProfile);

  DeviceProfile.$inject = [];

  function DeviceProfile() {
    var service = {}, profileMap;

    profileMap = {
      900: {
        devLinkType: 'Zigbee',
        devTypeName: '無線迷你閘道器',
        devModel: 'F-GW-600-ZE',
        hasDevLog: false
      },
      '0910': {
        devLinkType: 'Zigbee',
        devTypeName: '雲端智慧無線插座',
        devModel: 'PAN17',
        hasDevLog: true
      },
      212: {
        devLinkType: 'Zigbee',
        devTypeName: '雲端溫溼度計',
        devModel: 'SG110-A',
        hasDevLog: true
      },
      22: {
        devLinkType: 'Zigbee',
        devTypeName: '雲端紅外線動態感應器',
        devModel: 'SPM-05',
        hasDevLog: true
      },
      292: {
        devLinkType: 'Zigbee',
        devTypeName: '雲端警報器',
        devModel: 'PSE03-1',
        hasDevLog: true
      }
    };

    function getProfile(data) {
      var profile, devId;

      data = data || {};
      devId = data.devId;

      if (!data.devId) {
        return null;
      }

      profile = profileMap[data.devExtType];

      if (!profile) {
        profile = {
          devLinkType: '',
          devTypeName: '',
          devModel: '',
          hasDevLog: false
        };
      }

      data.devLinkType = profile.devLinkType;
      data.devTypeName = profile.devTypeName;
      data.devModel = profile.devModel;
      data.hasDevLog = profile.hasDevLog;
      data.instanceType = devId.toLowerCase().indexOf('sm') === 0 ? '模擬' : '實體';
      data.connectedState = data.connected ? '連線' : '斷線';

      return data;
    }

    function formatProfiles(resArray) {
      var i, cnt, data, formattedArray = [];

      if (!resArray) {
        return [];
      }

      cnt = resArray.length;

      for (i = 0; i < cnt; ++i) {
        data = resArray[i];
        formattedArray.push(getProfile(data));
      }

      return formattedArray;
    }

    service.formatProfiles = formatProfiles;

    return service;
  }
}());

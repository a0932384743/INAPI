(function () {
  'use strict';

  angular.module('download')
    .factory('DownLoadLinkDAO', DownLoadLinkDAO);

  DownLoadLinkDAO.$inject = ['$q', '$http', '$templateCache', 'DOC_LIST', 'EMU_LIST'];

  /* jshint sub:true */
  /* eslint dot-notation:0 */
  function DownLoadLinkDAO($q, $http, $templateCache, DOC_LIST, EMU_LIST) {
    var service = {}, configUrls;

    configUrls = {
      docUrls: 'i18n/download/doc-download-urls-zh-tw.json',
      emulatorUrls: 'i18n/download/emulator-download-urls-zh-tw.json'
    };

    function getDocUrlsList() {
      var data = DOC_LIST['zh-tw'] || $templateCache.get(configUrls.docUrls);

      if (data) {
        return $q.when({data: angular.fromJson(data)});
      }

      return $http.get(configUrls.docUrls);
    }

    function getEmulatorUrlsList() {
      var data = EMU_LIST['zh-tw'] || $templateCache.get(configUrls.emulatorUrls);

      if (data) {
        return $q.when({data: angular.fromJson(data)});
      }

      return $http.get(configUrls.emulatorUrls);
    }

    service.getDocUrlsList = getDocUrlsList;
    service.getEmulatorUrlsList = getEmulatorUrlsList;

    return service;
  }
}());

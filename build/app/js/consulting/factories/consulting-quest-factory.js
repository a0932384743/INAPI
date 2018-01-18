(function () {
  'use strict';

  angular.module('consulting')
    .factory('ConsultingQuest', ConsultingQuest);

  ConsultingQuest.$inject = ['$q', '$httpParamSerializerJQLike', '$state', 'APP_CONFIG', 'InApiUtils', 'DataAdapter', 'StorageAPI'];

  function ConsultingQuest($q, $httpParamSerializerJQLike, $state, APP_CONFIG, InApiUtils, DataAdapter, StorageAPI) {
    var service = {}, apiUrls;

    apiUrls = {
      questPost: APP_CONFIG.consultingPostUrl
    };

    function doPost(postParams) {
      var defer, config;

      if (!StorageAPI.isTokenValid('me')) {
        defer = $q.defer();
        defer.reject(InApiUtils.generateErrPack('r8999', 'The access token is expired.'));

        $state.go(APP_CONFIG.loginState);

        return defer.promise;
      }

      config = {
        method: 'POST',
        url: apiUrls.questPost,
        data: $httpParamSerializerJQLike(postParams),
        headers: {
          Authorization: 'Bearer ' + StorageAPI.getToken('me').accessToken
        }
      };

      return DataAdapter.requestRemoteSvr(config);
    }

    service.doPost = doPost;

    return service;
  }
}());

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

//# sourceMappingURL=consulting-quest-factory.js.map

(function () {
  'use strict';

  angular.module('core')
    .factory('DataAdapter', DataAdapter);

  DataAdapter.$inject = ['$http', '$httpParamSerializerJQLike', '$q', '$log', '$state', '$translate', 'dialogs',
                          'APP_CONFIG', 'InApiUtils', 'StorageAPI'];

  function DataAdapter($http, $httpParamSerializerJQLike, $q, $log, $state, $translate, dialogs,
                        APP_CONFIG, InApiUtils, StorageAPI) {
    var service = {}, httpTimeoutMilliSeconds;

    httpTimeoutMilliSeconds = parseInt(APP_CONFIG.httpTimeoutMilliSeconds, 10) || 60000;

    function requestRemoteSvr(config) {
      var defer, promise;

      defer = $q.defer();
      promise = defer.promise;

      config = config.timeout ? config : angular.extend(config, {
        timeout: httpTimeoutMilliSeconds
      });

      config.headers = angular.merge(config.headers || {}, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      });

      $http(config).then(function (res) {
        if (res && res.data) {
          defer.resolve(res.data);
        } else {
          defer.reject(InApiUtils.generateErrPack('r9999', 'No result after requesting remote server!'));
        }
      }, function (res) {
        if (res.status === -1) {
          dialogs.notify($translate.instant('NOTIFICATION_TITLE'), $translate.instant('HTTP_REQUEST_TIMEOUT'));
          defer.reject(InApiUtils.generateErrPack('-1', 'The Request is timeout.'));
        } else if (res.data) {
          defer.reject(res.data);
        } else {
          defer.reject(InApiUtils.generateErrPack('r9998', 'An error occurs when requesting remote server!'));
        }
      });

      return promise;
    }

    function requestAuthSvrCredential() {
      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      var config = {
        method: 'POST',
        url: APP_CONFIG.authSvrUrl + '/ec/oauth/token',
        data: $httpParamSerializerJQLike({
          client_id: APP_CONFIG.credentialClientId,
          client_secret: APP_CONFIG.credentialClientSecret,
          grant_type: 'client_credentials',
          apsystem: 'DPA'
        })
      };

      return requestRemoteSvr(config);
    }

    function requestAuthSvrPassword(apiPath, apsystem, postParams) {
      var config, promise, un = postParams.username;

      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      postParams = angular.merge(postParams || {}, {
        client_id: APP_CONFIG.passwordClientId,
        client_secret: APP_CONFIG.passwordClientSecret,
        grant_type: 'password',
        apsystem: apsystem
      });

      config = {
        method: 'POST',
        url: APP_CONFIG.authSvrUrl + apiPath,
        data: $httpParamSerializerJQLike(postParams)
      };

      promise = requestRemoteSvr(config);
      promise.then(function (data) {
        var profile, now;

        if (apsystem === 'DPA') {
          StorageAPI.setToken('me', data.access_token, data.expires_in);
          StorageAPI.writeToken('me');
        } else if (un) {
          now = new Date().getTime();

          profile = {
            userId: un,
            token: {
              accessToken: data.access_token || '',
              expiresAt: now + 1000 * parseInt(data.expires_in, 10)
            }
          };

          StorageAPI.setAccount(un, profile);
        }
      });

      return promise;
    }

    function requestApiSvrCredential(method, apiPath, rqtParams) {
      var queue;

      queue = requestAuthSvrCredential()
        .then(function (resData) {
          var data, config;

          /* jshint camelcase:false */
          /* eslint camelcase:0 */
          data = {
            client_id: APP_CONFIG.credentialClientId,
            client_secret: APP_CONFIG.credentialClientSecret,
            grant_type: 'client_credentials'
          };

          config = {
            method: method,
            url: APP_CONFIG.apiSvrUrl + apiPath,
            data: $httpParamSerializerJQLike(angular.merge(rqtParams || {}, data)),
            headers: {
              Authorization: 'Bearer ' + resData.access_token
            }
          };

          return requestRemoteSvr(config);
        }, function (resData) {
          $log.info(resData);
        });

      return queue;
    }

    function requestApiSvrPassword(un, method, apiPath, rqtParams) {
      var defer, data, config;

      if (!StorageAPI.isTokenValid(un)) {
        defer = $q.defer();
        defer.reject(InApiUtils.generateErrPack('r8999', 'The access token is expired!'));

        if (un === 'me') {
          $state.go(APP_CONFIG.logoutState);
        }

        return defer.promise;
      }

      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      data = {
        client_id: APP_CONFIG.passwordClientId,
        client_secret: APP_CONFIG.passwordClientSecret,
        grant_type: 'password'
      };

      config = {
        method: method,
        url: APP_CONFIG.apiSvrUrl + apiPath,
        headers: {
          Authorization: 'Bearer ' + StorageAPI.getToken(un).accessToken
        }
      };

      if (method === 'POST' || method === 'PUT') {
        config.data = $httpParamSerializerJQLike(angular.merge(rqtParams || {}, data));
      } else if (method === 'GET' || method === 'DELETE') {
        config.params = angular.merge(rqtParams || {}, data);
        config.paramSerializer = $httpParamSerializerJQLike;
      }

      return requestRemoteSvr(config);
    }

    function requestApiProxyCredential(method, apiPath, rqtParams) {
      var queue = requestAuthSvrCredential()
        .then(function (resData) {
          var data, config;

          /* jshint camelcase:false */
          /* eslint camelcase:0 */
          data = {
            svrtype: 'API',
            webapi: apiPath,
            client_id: APP_CONFIG.credentialClientId,
            client_secret: APP_CONFIG.credentialClientSecret,
            grant_type: 'client_credentials'
          };

          config = {
            method: method,
            url: APP_CONFIG.apiProxyUrl,
            data: $httpParamSerializerJQLike(angular.merge(rqtParams || {}, data)),
            headers: {
              Authorization: 'Bearer ' + resData.access_token
            }
          };

          return requestRemoteSvr(config);
        }, function (resData) {
          $log.info(resData);
        });

      return queue;
    }

    service.requestRemoteSvr = requestRemoteSvr;
    service.requestAuthSvrCredential = requestAuthSvrCredential;
    service.requestAuthSvrPassword = requestAuthSvrPassword;
    service.requestApiSvrCredential = requestApiSvrCredential;
    service.requestApiSvrPassword = requestApiSvrPassword;
    service.requestApiProxyCredential = requestApiProxyCredential;

    return service;
  }
}());

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

//# sourceMappingURL=data-adapter-factory.js.map

(function () {
  'use strict';

  angular.module('devicelog')
    .factory('ResourceDAO', ResourceDAO);

  ResourceDAO.$inject = ['$q', 'InApiUtils', 'StorageAPI', 'DataAdapter'];

  function ResourceDAO($q, InApiUtils, StorageAPI, DataAdapter) {
    var service = {}, apiUrls;

    apiUrls = {
      login: '/if/oauth/token',
      resourceAccounts: '/api/core/1/user/resource_accounts'
    };

    function addResourceAccount(un, resourceToken, resourceExpiresAt) {
      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      var postParams = {
        user_id: StorageAPI.getMyUserId(),
        apsystem: 'DPA',
        resource_user_id: un,
        resource_apsystem: 'IFA',
        resource_token: resourceToken,
        expires_at: resourceExpiresAt
      };

      return DataAdapter.requestApiSvrPassword('me', 'PUT', apiUrls.resourceAccounts, postParams);
    }

    function doLogin(un, pwd) {
      var defer = $q.defer(), queue, postParams;

      un = (un || '').toLowerCase();
      pwd = pwd || '';
      postParams = {
        username: un,
        password: pwd
      };

      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      queue = DataAdapter.requestAuthSvrPassword(apiUrls.login, 'IFA', postParams)
        .then(function (res) {
          var accessToken, expiresIn, expiresAt;

          res = res || {};
          accessToken = res.access_token;
          expiresIn = parseInt(res.expires_in, 10) || 0;
          expiresAt = new Date().getTime() + 1000 * expiresIn;

          if (accessToken && expiresIn > 0) {
            StorageAPI.setToken(un, accessToken, expiresIn);
            return addResourceAccount(un, accessToken, expiresAt);
          }

          defer.reject(InApiUtils.generateErrPack('resource.auth.failure.0001', 'Token is invalid.'));
        }, function (res) {
          defer.reject(res);
        });

      if (queue) {
        queue.then(function () {
          defer.resolve({un: un});
        }, function () {
          defer.reject(InApiUtils.generateErrPack('resource.add.failure.0001', 'Fail to add resource.'));
        });
      }

      return defer.promise;
    }

    function deleteResource(un) {
      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      var postParams = {
        user_id: StorageAPI.getMyUserId(),
        apsystem: 'DPA',
        resource_user_id: un,
        resource_apsystem: 'IFA'
      };

      return DataAdapter.requestApiSvrPassword('me', 'DELETE', apiUrls.resourceAccounts, postParams);
    }

    function getResourceList() {
      var defer = $q.defer(), urlParams;

      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      urlParams = {
        user_id: StorageAPI.getMyUserId(),
        apsystem: 'DPA'
      };

      DataAdapter.requestApiSvrPassword('me', 'GET', apiUrls.resourceAccounts, urlParams)
        .then(function (resData) {
          var i, cnt = 0, profile;

          if (resData && resData.err && resData.err.code === '0') {
            resData = InApiUtils.camelizeObj(resData);
            resData.resourceAccountList = resData.resourceAccountList || [];
            cnt = resData.resourceAccountList.length;

            for (i = 0; i < cnt; ++i) {
              profile = resData.resourceAccountList[i];
              StorageAPI.setAccount(profile.userId, profile);
              if (profile.token) {
                StorageAPI.setTokenWithExpiresAt(profile.userId, profile.token.accessToken, profile.token.expiresAt);
              }
            }

            defer.resolve(resData.resourceAccountList);
          } else {
            defer.reject(resData);
          }
        }, function (resData) {
          defer.reject(resData);
        });

      return defer.promise;
    }

    service.doLogin = doLogin;
    service.deleteResource = deleteResource;
    service.getResourceList = getResourceList;

    return service;
  }
}());

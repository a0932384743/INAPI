(function () {
  'use strict';

  angular.module('account')
    .factory('AccountDAO', AccountDAO);

  AccountDAO.$inject = ['$q', 'APP_CONFIG', 'StorageAPI', 'DataAdapter'];

  function AccountDAO($q, APP_CONFIG, StorageAPI, DataAdapter) {
    var service = {}, apiUrls;

    apiUrls = {
      myInfo: '/api/core/1/user/me',
      changeUserInfo: '/api/core/1/user/info',
      retrieveCredential: '/api/core/1/user/developer_credentials'
    };

    function getMyInfo() {
      var defer = $q.defer(), myAccount = StorageAPI.getAccount('me');

      if (myAccount.updateTime) {
        defer.resolve(myAccount);
      } else {
        DataAdapter.requestApiSvrPassword('me', 'GET', apiUrls.myInfo)
          .then(function (resData) {
            if (resData && resData.err && resData.err.code === '0') {
              myAccount = resData.user;
              StorageAPI.setAccount('me', myAccount);
              defer.resolve(StorageAPI.getAccount('me'));
            } else {
              defer.reject(resData);
            }
          }, function (resData) {
            defer.reject(resData);
          });
      }

      return defer.promise;
    }

    function doRetrieveCredential(apsystem, userId) {
      var defer = $q.defer(), myAccount = StorageAPI.getAccount('me'), credential = {}, postParams;

      if (myAccount.credential && myAccount.credential.clientId) {
        defer.resolve(myAccount.credential);
      } else {
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          apsystem: apsystem || '',
          user_id: userId || '',
          code: APP_CONFIG.retrieveCredentialCode
        };

        DataAdapter.requestApiSvrPassword('me', 'GET', apiUrls.retrieveCredential, postParams)
          .then(function (resData) {
            if (resData && resData.err && resData.err.code === '0') {
              credential = {
                clientId: resData.client_id,
                clientSecret: resData.client_secret
              };

              if (myAccount) {
                myAccount.credential = credential;
                StorageAPI.setAccount('me', myAccount);
              }
              defer.resolve(credential);
            } else {
              defer.reject(resData);
            }
          }, function (resData) {
            defer.reject(resData);
          });
      }

      return defer.promise;
    }

    function doChangeUserName(userName) {
      var defer = $q.defer(), postParams;

      getMyInfo().then(function (me) {
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          user_id: me.userId,
          apsystem: 'DPA',
          this_user_id: me.userId,
          this_apsystem: 'DPA',
          user_name: userName || ''
        };

        return DataAdapter.requestApiSvrPassword('me', 'PUT', apiUrls.changeUserInfo, postParams);
      }).then(function (resData) {
        if (resData && resData.err && resData.err.code === '0') {
          StorageAPI.getAccount('me').userName = userName;
          defer.resolve(userName);
        } else {
          defer.reject(resData);
        }
      }, function (resData) {
        defer.reject(resData);
      });

      return defer.promise;
    }

    function doChangeUserEmail(email, pwd) {
      var defer = $q.defer(), postParams;

      email = (email || '').toLowerCase();

      getMyInfo().then(function (me) {
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          user_id: me.userId,
          apsystem: 'DPA',
          this_user_id: me.userId,
          this_apsystem: 'DPA',
          email: email,
          pwd: pwd || ''
        };

        return DataAdapter.requestApiSvrPassword('me', 'PUT', apiUrls.changeUserInfo, postParams);
      }).then(function (resData) {
        if (resData && resData.err && resData.err.code === '0') {
          StorageAPI.getAccount('me').email = email;
          defer.resolve(email);
        } else {
          defer.reject(resData);
        }
      }, function (resData) {
        defer.reject(resData);
      });

      return defer.promise;
    }

    function doChangeUserPwd(pwd, newPwd) {
      var defer = $q.defer(), postParams;

      getMyInfo().then(function (me) {
        /* jshint camelcase:false */
        /* eslint camelcase:0 */
        postParams = {
          user_id: me.userId,
          apsystem: 'DPA',
          this_user_id: me.userId,
          this_apsystem: 'DPA',
          pwd: pwd || '',
          new_pwd: newPwd || ''
        };

        return DataAdapter.requestApiSvrPassword('me', 'PUT', apiUrls.changeUserInfo, postParams);
      }).then(function (resData) {
        defer.resolve(resData);
      }, function (resData) {
        defer.reject(resData);
      });

      return defer.promise;
    }

    service.getMyInfo = getMyInfo;
    service.doRetrieveCredential = doRetrieveCredential;
    service.doChangeUserName = doChangeUserName;
    service.doChangeUserEmail = doChangeUserEmail;
    service.doChangeUserPwd = doChangeUserPwd;

    return service;
  }
}());

(function () {
  'use strict';

  angular.module('secure')
    .factory('SecureAuth', SecureAuth);

  SecureAuth.$inject = ['$q', 'base64', 'APP_CONFIG', 'StorageAPI', 'InApiUtils', 'DataAdapter', 'DeviceDAO'];

  function SecureAuth($q, base64, APP_CONFIG, StorageAPI, InApiUtils, DataAdapter, DeviceDAO) {
    var service = {}, apiUrls;

    apiUrls = {
      login: '/ec/oauth/token',
      register: '/api/core/1/common/user_register',
      resendVerification: '/api/core/1/common/resend_verification',
      changeEmail: '/api/core/1/common/user_email',
      forgetPwd: '/api/core/1/common/forget_password',
      resetPwd: '/api/core/1/common/reset_password',
      verifyUser: '/api/core/1/common/user_verify'
    };

    function isLogin() {
      return StorageAPI.isTokenValid('me');
    }

    function doLogin(un, pwd) {
      var defer = $q.defer(), postParams;

      un = (un || '').toLowerCase();
      pwd = pwd || '';
      postParams = {
        username: un,
        password: pwd
      };

      /* jshint camelcase:false */
      /* eslint camelcase:0 */
      DataAdapter.requestAuthSvrPassword(apiUrls.login, 'DPA', postParams)
        .then(function (res) {
          var expiresIn;

          res = res || {};
          expiresIn = parseInt(res.expires_in, 10) || 0;

          if (expiresIn > 0 && res.access_token) {
            StorageAPI.setMyUserId(un);
            StorageAPI.setToken('me', res.access_token, expiresIn);
            StorageAPI.writeToken('me');
            defer.resolve(InApiUtils.generateErrPack('auth.success.0001', 'Login successfully.'));
          } else {
            defer.reject(InApiUtils.generateErrPack('auth.failure.0001', 'Invalid username or password.'));
          }
        }, function (resData) {
          var err = resData.err || {};

          if (err.code === '400' && err.msg && err.msg.indexOf('[User is disabled]') > -1) {
            StorageAPI.setMyUserId(un);
            defer.reject(InApiUtils.generateErrPack('auth.failure.0002', 'User is disabled.'));
          } else {
            defer.reject(InApiUtils.generateErrPack('auth.failure.0001', 'Invalid username or password.'));
          }
        });

      return defer.promise;
    }

    function doLogout() {
      StorageAPI.destroy();
      DeviceDAO.destroy();
    }

    function doRegister(postParams) {
      var defer = $q.defer();

      DataAdapter.requestApiProxyCredential('POST', apiUrls.register, postParams)
        .then(function (resData) {
          if (resData && resData.err && resData.err.code === '0') {
            /* jshint camelcase:false */
            /* eslint camelcase:0 */
            StorageAPI.setMyUserId(postParams.this_user_id);
            StorageAPI.getAccount('me').email = postParams.email;
          }
          defer.resolve(resData);
        }, function (resData) {
          defer.reject(resData);
        });

      return defer.promise;
    }

    function doResendVerification(postParams) {
      var promise;

      promise = DataAdapter.requestApiSvrCredential('PUT', apiUrls.resendVerification, postParams);

      return promise;
    }

    function doChangeEmail(postParams) {
      var promise;

      promise = DataAdapter.requestApiSvrCredential('PUT', apiUrls.changeEmail, postParams);

      return promise;
    }

    function requestToChangePwd(postParams) {
      var promise;

      promise = DataAdapter.requestApiProxyCredential('POST', apiUrls.forgetPwd, postParams);

      return promise;
    }

    function doResetPwd(postParams) {
      var promise;

      promise = DataAdapter.requestApiSvrCredential('PUT', apiUrls.resetPwd, postParams);

      return promise;
    }

    function doVerifyUser(postParams) {
      var promise;

      promise = DataAdapter.requestApiSvrCredential('PUT', apiUrls.verifyUser, postParams);

      return promise;
    }

    function getUserVerifyBackUrl(userId) {
      userId = (userId || '').toLowerCase();

      return InApiUtils.stringFormat(
        '{0}{1}?un={2}&code={code}', InApiUtils.getAppRootUrl(), APP_CONFIG.userVerifyUrl, base64.encode(userId)
      );
    }

    function getResetPwdBackUrl(userId) {
      userId = (userId || '').toLowerCase();

      return InApiUtils.stringFormat(
        '{0}{1}?un={2}&code={code}', InApiUtils.getAppRootUrl(), APP_CONFIG.resetPwdUrl, base64.encode(userId)
      );
    }

    service.isLogin = isLogin;
    service.doLogin = doLogin;
    service.doLogout = doLogout;
    service.doRegister = doRegister;
    service.doResendVerification = doResendVerification;
    service.doChangeEmail = doChangeEmail;
    service.requestToChangePwd = requestToChangePwd;
    service.doResetPwd = doResetPwd;
    service.doVerifyUser = doVerifyUser;
    service.getUserVerifyBackUrl = getUserVerifyBackUrl;
    service.getResetPwdBackUrl = getResetPwdBackUrl;

    return service;
  }
}());

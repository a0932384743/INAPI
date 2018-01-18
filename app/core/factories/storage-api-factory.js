(function () {
  'use strict';

  angular.module('core')
    .factory('StorageAPI', StorageAPI);

  StorageAPI.$inject = ['$window', '$log', 'base64', 'InApiUtils'];

  function StorageAPI($window, $log, base64, InApiUtils) {
    var service = {}, accounts = {}, flagUserVerified = false, returnState = '', TOKENPREFIX = 'token:';

    function Account() {
      var account = this;

      function init() {
        account.userId = null;
        account.userName = null;
        account.email = null;
        account.updateTime = null;
        account.apsystem = null;
        account.token = {
          accessToken: null,
          expiresAt: null
        };
      }

      function resetToken() {
        account.token = {
          accessToken: null,
          expiresAt: null
        };
      }

      init();

      account.init = init;
      account.resetToken = resetToken;
    }

    function read(key) {
      var value = $window.localStorage.getItem(key);

      if (typeof value === 'undefined' || value === null) {
        return null;
      }

      try {
        value = angular.fromJson(value);
      } catch (e) {
        value = value.toString();
      }

      return value;
    }

    function write(key, value) {
      var con = null;

      if (value) {
        con = value.constructor;
      }

      if (con && con !== String && con !== Number && con !== Boolean) {
        value = angular.toJson(value, false);
      }

      $window.localStorage.setItem(key, value);

      return service;
    }

    function clear(key) {
      $window.localStorage.removeItem(key);

      return service;
    }

    function getToken(un) {
      var account;

      if (!un) {
        return null;
      }

      account = getAccount(un);

      if (!isTokenValid(un)) {
         // clear token in passing
        account.resetToken();
      }

      return account.token;
    }

    function setToken(un, accessToken, expiresIn) {
      var account;

      if (un) {
        expiresIn = parseInt(expiresIn, 10) || 0;
        account = getAccount(un);

        account.token = {
          accessToken: accessToken,
          expiresAt: expiresIn > 0 ? new Date().getTime() + 1000 * expiresIn : null
        };
      }

      return service;
    }

    function setTokenWithExpiresAt(un, accessToken, expiresAt) {
      var account, currentTimeStamp;

      if (un) {
        expiresAt = parseInt(expiresAt, 10) || 0;
        account = getAccount(un);
        currentTimeStamp = new Date().getTime();

        account.token = {
          accessToken: accessToken,
          expiresAt: expiresAt > currentTimeStamp ? expiresAt : null
        };
      }

      return service;
    }

    function readToken(un) {
      var account;

      if (un) {
        account = getAccount(un);

        if (un === 'me') {
          account.token = read(TOKENPREFIX + 'me');
        } else {
          account.token = read(TOKENPREFIX + base64.encode(un));
        }

        if (isTokenValid(un)) {
          account.token.accessToken = base64.decode(account.token.accessToken);
          account.token.expiresAt = parseInt(account.token.expiresAt, 10) || 0;
        } else {
          account.resetToken();
        }
      }

      return service;
    }

    function readAllToken() {
      var i, cnt = $window.localStorage.length, key, encryptUn;

      for (i = 0; i < cnt; ++i) {
        key = $window.localStorage.key(i);

        // start with 'token:'
        if (key.indexOf(TOKENPREFIX) === 0) {
          encryptUn = key.replace(TOKENPREFIX, '');
          if (encryptUn === 'me') {
            readToken('me');
          } else {
            try {
              readToken(base64.decode(encryptUn));
            } catch (e) {
              $log.error(e);
            }
          }
        }
      }
    }

    function writeToken(un) {
      var encryptUn, token, encryptToken;

      if (un) {
        encryptUn = un === 'me' ? 'me' : base64.encode(un);
        token = getToken(un);

        if (token && token.accessToken && token.accessToken.length > 0) {
          // copy token
          encryptToken = angular.merge({}, token);
          encryptToken.accessToken = base64.encode(encryptToken.accessToken);
          write(TOKENPREFIX + encryptUn, encryptToken);
        } else {
          write(TOKENPREFIX + encryptUn, null);
        }
      }

      return service;
    }

    function isTokenValid(un) {
      var token, nowTime = new Date().getTime();

      token = getAccount(un).token;

      //return token && token.accessToken && token.expiresAt && token.expiresAt > nowTime;
      return true;
    }

    function clearToken(un) {
      if (un) {
        setToken(un, null, null);
      }

      return service;
    }

    function getFlagUserVerified() {
      return flagUserVerified;
    }

    function setFlagUserVerified(val) {
      flagUserVerified = val;

      return service;
    }

    function getAccount(un) {
      if (!un) {
        return null;
      }

      accounts[un] = accounts[un] || new Account();

      return accounts[un];
    }

    function setAccount(un, data) {
      var account, key, camelizedKey;

      if (!un) {
        return null;
      }

      if (data) {
        account = accounts[un] || new Account();

        for (key in data) {
          if (data.hasOwnProperty(key)) {
            camelizedKey = InApiUtils.camelize(key);
            account[camelizedKey] = InApiUtils.camelizeObj(data[key]);
          }
        }

        account[un] = account;
      } else {
        accounts[un] = null;
      }

      return service;
    }

    function getMyUserId() {
      return getAccount('me').userId;
    }

    function setMyUserId(userId) {
      getAccount('me').userId = userId;

      return service;
    }

    function getReturnState() {
      return returnState;
    }

    function setReturnState(state) {
      returnState = state;
    }

    function destroy() {
      var un;

      for (un in accounts) {
        if (accounts.hasOwnProperty(un)) {
          accounts[un] = null;

          if (un === 'me') {
            clear(TOKENPREFIX + 'me');
          } else {
            clear(TOKENPREFIX + base64.encode(un));
          }
        }
      }

      return service;
    }

    service.read = read;
    service.write = write;
    service.clear = clear;
    service.getToken = getToken;
    service.setToken = setToken;
    service.setTokenWithExpiresAt = setTokenWithExpiresAt;
    service.readToken = readToken;
    service.readAllToken = readAllToken;
    service.writeToken = writeToken;
    service.clearToken = clearToken;
    service.isTokenValid = isTokenValid;
    service.getAccount = getAccount;
    service.setAccount = setAccount;
    service.getFlagUserVerified = getFlagUserVerified;
    service.setFlagUserVerified = setFlagUserVerified;
    service.getMyUserId = getMyUserId;
    service.setMyUserId = setMyUserId;
    service.getReturnState = getReturnState;
    service.setReturnState = setReturnState;
    service.destroy = destroy;

    return service;
  }
}());

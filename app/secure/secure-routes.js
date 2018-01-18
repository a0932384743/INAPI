(function () {
  'use strict';

  angular.module('secure')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('secure', {
      abstract: true,
      url: '/secure',
      template: '<data-ui-view />'
    }).state('secure.register', {
      url: '/register',
      templateUrl: 'secure/views/secure-1-2-register.tpl.html',
      controller: 'SecureRegisterCtrl',
      controllerAs: 'vm',
      data: {
        escapeIfLoggedIn: true
      }
    }).state('secure.login', {
      url: '/login',
      templateUrl: 'secure/views/secure-1-3-login.tpl.html',
      controller: 'SecureLoginCtrl',
      controllerAs: 'vm',
      data: {
        escapeIfLoggedIn: true
      }
    }).state('secure.logout', {
      url: '/logout',
      controller: 'SecureLogoutCtrl',
      controllerAs: 'vm'
    }).state('secure.register-result', {
      url: '/register-result',
      templateUrl: 'secure/views/secure-1-5-register-result.tpl.html',
      controller: 'SecureRegisterResultCtrl',
      controllerAs: 'vm',
      data: {
        escapeIfLoggedIn: true
      }
    }).state('secure.email-change', {
      url: '/email-change',
      templateUrl: 'secure/views/secure-1-7-email-change.tpl.html',
      controller: 'SecureEmailChangeCtrl',
      controllerAs: 'vm',
      data: {
        escapeIfLoggedIn: true
      }
    }).state('secure.forget-pwd', {
      url: '/forget-pwd',
      templateUrl: 'secure/views/secure-1-8-forget-pwd.tpl.html',
      controller: 'SecureForgetPwdCtrl',
      controllerAs: 'vm'
    }).state('secure.register-disabled', {
      url: '/register-disabled',
      templateUrl: 'secure/views/secure-1-9-register-disabled.tpl.html',
      controller: 'SecureRegisterResultCtrl',
      controllerAs: 'vm',
      data: {
        escapeIfLoggedIn: true
      }
    }).state('secure.reset-pwd', {
      url: '/reset-pwd',
      templateUrl: 'secure/views/secure-1-10-reset-pwd.tpl.html',
      controller: 'SecureResetPwdCtrl',
      controllerAs: 'vm'
    }).state('secure.user-verify', {
      url: '/user-verify',
      controller: 'SecureUserVerifyCtrl',
      controllerAs: 'vm'
    }).state('secure.user-verify-success', {
      url: '/user-verify-success',
      templateUrl: 'secure/views/secure-1-11-user-verify-success.tpl.html',
      controller: 'SecureUserVerifySuccessCtrl',
      controllerAs: 'vm'
    });
  }
}());

(function () {
  'use strict';

  angular.module('account')
    .controller('AccountUserInfoCtrl', Ctrl);

  Ctrl.$inject = ['$scope', '$filter', '$state', '$stateParams', 'dialogs', 'InApiUtils', 'AccountDAO'];

  function Ctrl($scope, $filter, $state, $stateParams, dialogs, InApiUtils, AccountDAO) {
    var vm = this;

    vm.isUserIdInvalid = true;
    vm.clientId = vm.clientSecret = '載入中...';

    function init() {
      var queue;

      queue = AccountDAO.getMyInfo()
        .then(function (me) {
          vm.userId = me.userId;
          vm.userName = me.userName;
          vm.userEmail = me.email;
          vm.updateTime = $filter('date')(new Date(me.updateTime), 'yyyy-MM-dd HH:mm:ss');
          vm.isUserIdInvalid = false;

          return AccountDAO.doRetrieveCredential('DPA', me.userId);
        }, function (resData) {
          dialogs.notify(
            '取得登入人員資料錯誤',
            InApiUtils.stringFormat('錯誤代碼：{0}, <br />錯誤訊息：{1}', resData.err.code, resData.err.msg)
          );
        });

      queue.then(function (credential) {
        vm.clientId = credential.clientId;
        vm.clientSecret = credential.clientSecret;
      }, function (resData) {
        dialogs.notify(
          '取得認證資料錯誤',
          InApiUtils.stringFormat('錯誤代碼：{0}, <br />錯誤訊息：{1}', resData.err.code, resData.err.msg)
        );
      });
    }

    function editUserName() {
      var data = {
        userName: vm.userName || ''
      };

      dialogs.create(
        'account/views/account-8-2-change-username.tpl.html',
        'ChangeUserNameCtrl as vm',
        data,
        {size: 'lg'}
      ).result.then(function (userName) {
        vm.userName = userName;
        $scope.$broadcast('change:userDisplayName', userName);
      }).finally(function () {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    }

    function editEmail() {
      var data = {
        userEmail: vm.userEmail || ''
      };

      dialogs.create(
        'account/views/account-8-3-change-email.tpl.html',
        'ChangeEmailCtrl as vm',
        data,
        {size: 'lg'}
      ).result.then(function (email) {
        vm.userEmail = email;
      }).finally(function () {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    }

    function editPwd() {
      dialogs.create(
        'account/views/account-8-4-change-pwd.tpl.html',
        'ChangePwdCtrl as vm',
        {},
        {size: 'lg'}
      ).result.finally(function () {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    }

    init();

    vm.editUserName = editUserName;
    vm.editEmail = editEmail;
    vm.editPwd = editPwd;

    return vm;
  }
}());

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

//# sourceMappingURL=account-8-1-user-info-controller.js.map

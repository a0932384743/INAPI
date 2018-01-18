(function () {
  'use strict';

  angular.module('devicelog')
    .factory('ResourceDialog', ResourceDialog);

  ResourceDialog.$inject = ['$modalStack', 'dialogs'];

  function ResourceDialog($modalStack, dialogs) {
    var service = {};

    function showAuthentication(un) {
      var dlg;

      $modalStack.dismissAll();

      dlg = dialogs.create(
        'devicelog/views/devicelog-5-2-add-resource.tpl.html',
        'AddResourceCtrl as vm',
        {un: un},
        {size: 'lg'}
      );

      return dlg.result;
    }

    service.showAuthentication = showAuthentication;

    return service;
  }
}());

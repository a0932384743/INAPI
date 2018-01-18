(function () {
  'use strict';

  angular.module('core')
    .component('inapiLogo', {
      templateUrl: 'core/components/logo-component.tpl.html',
      controller: 'LogoCtrl',
      controllerAs: 'vm'
    });
}());

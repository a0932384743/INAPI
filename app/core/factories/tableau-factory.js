(function () {
  'use strict';

  angular.module('core')
    .factory('Tableau', Tableau);

  Tableau.$inject = ['$window'];

  function Tableau($window) {
    return $window.tableau;
  }
}());

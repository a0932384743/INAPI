(function () {
  'use strict';

  angular.module('core')
    .factory('InApiValidator', InApiValidator);

  InApiValidator.$inject = [];

  function InApiValidator() {
    var service = {};

    function isValidUn(val) {
      var reg = /^[a-zA-Z0-9]+$/;

      return reg.test(val);
    }

    function isValidEmail(val) {
      var reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

      return reg.test(val);
    }

    function isValidPassword(val) {
      var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;

      return reg.test(val);
    }

    function getStringBLength(str) {
      var wildChar;

      str = str || '';

      if (str === '') {
        return 0;
      }

      wildChar = str.match(/[^ -~]/g);

      return str.length + (wildChar ? wildChar.length : 0);
    }

    service.isValidUn = isValidUn;
    service.isValidEmail = isValidEmail;
    service.isValidPassword = isValidPassword;
    service.getStringBLength = getStringBLength;

    return service;
  }
}());

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

//# sourceMappingURL=inapi-validator-factory.js.map

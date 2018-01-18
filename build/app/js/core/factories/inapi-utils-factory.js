(function () {
  'use strict';

  angular.module('core')
    .factory('InApiUtils', InApiUtils);

  InApiUtils.$inject = ['$location'];

  function InApiUtils($location) {
    var service = {};

    /**
     * register a global function of string formating like C#
     * @param {String} str formating string
     * @return {String} formatted string
     * @usage: String.format("I have a {0}.", pen); => output: "I have a pen."
     */
    function stringFormat(str) {
      var args = arguments || [];

      if (!str) {
        return null;
      }

      if (args.length === 1) {
        return str;
      }

      return str.replace(/\{(\d+)\}/g,
        function (m, i) {
          // i is String
          i = parseInt(i, 10);
          return args[i + 1];
        }
      );
    }

    function camelize(str) {
      if (!str || angular.isNumber(str)) {
        return str;
      }

      str = str.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });

      // Ensure 1st char is always lowercase
      return str.substr(0, 1).toLowerCase() + str.substr(1);
    }

    function camelizeObj(obj) {
      var i, cnt, key, formattedObj = {}, value;

      if (!obj) {
        return obj;
      }

      if (obj.constructor === Array) {
        cnt = obj.length;

        formattedObj = [];

        for (i = 0; i < cnt; ++i) {
          formattedObj[i] = camelizeObj(obj[i]);
        }
      } else if (obj.constructor === Object) {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            value = obj[key];
            formattedObj[camelize(key)] = value && value.constructor === Function ? value : camelizeObj(value);
          }
        }
      } else {
        formattedObj = obj;
      }

      return formattedObj;
    }

    function generateErrPack(code, msg) {
      return {
        err: {
          code: code,
          msg: msg
        }
      };
    }

    function getAppRootUrl() {
      return stringFormat('{0}://{1}:{2}/#/', $location.protocol(), $location.host(), $location.port());
    }

    service.stringFormat = stringFormat;
    service.camelize = camelize;
    service.camelizeObj = camelizeObj;
    service.generateErrPack = generateErrPack;
    service.getAppRootUrl = getAppRootUrl;

    return service;
  }
}());

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

//# sourceMappingURL=inapi-utils-factory.js.map

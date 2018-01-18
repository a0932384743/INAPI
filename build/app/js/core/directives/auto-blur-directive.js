(function () {
  'use strict';

  angular.module('core')
    .directive('autoBlur', autoBlur);

  autoBlur.$inject = [];

  function autoBlur() {
    var directive = {};

    /* jshint unused:false */
    /* eslint no-unused-vars:0 */
    function link(scope, element, attrs) {
      element.bind('click', function () {
        element.blur();
      });
    }

    directive = {
      restrict: 'A',
      link: link
    };

    return directive;
  }
}());

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

//# sourceMappingURL=auto-blur-directive.js.map

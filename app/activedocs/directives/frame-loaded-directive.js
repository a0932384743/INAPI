(function () {
  'use strict';

  angular.module('activedocs')
    .directive('frameLoaded', frameLoaded);

  frameLoaded.$inject = [];

  function frameLoaded() {
    var directive = {};

    /* jshint unused:false */
    /* eslint no-unused-vars:0 */
    function link(scope, element, attrs) {
      // hooking up the onload event - calling the callback on load event
      element.one('load', function () {
        var contentLoaded = element.length > 0 && element[0].contentWindow && element[0].contentWindow.location ?
          true : false;

        scope.callback({
          contentLoaded: contentLoaded
        });
      });
    }

    directive = {
      restrict: 'A',
      scope: {
        callback: '&frameLoaded'
      },
      link: link
    };

    return directive;
  }
}());

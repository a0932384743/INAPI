(function () {
  'use strict';

  angular.module('core')
    .directive('equalHeights', equalHeights);

  equalHeights.$inject = ['$timeout'];

  function equalHeights($timeout) {
    var directive = {};

    /* jshint unused:false */
    /* eslint no-unused-vars:0 */
    /* eslint "angular/ng_document_service":0 */
    /* global document : false */
    function link(scope, element, attrs) {
      function watchHandler(newValue, oldValue) {
        function timerHandler() {
          var sourceSelector, targetSelector, maxHeight;
          sourceSelector = angular.isDefined(scope.sourceSelector) ?
            angular.element(document.querySelector(scope.sourceSelector)) : null;
          targetSelector = angular.isDefined(scope.targetSelector) ?
            angular.element(document.querySelector(scope.targetSelector)) : null;
          maxHeight = 0;

          if (sourceSelector && sourceSelector.length > 0) {
            angular.forEach(sourceSelector, function (node) {
              if (node && node.offsetHeight && Number(node.offsetHeight) > maxHeight) {
                maxHeight = Number(node.offsetHeight);
              }
            });
          } else {
            maxHeight = Number(element[0].offsetHeight);
          }

          if (targetSelector && targetSelector.length > 0) {
            angular.forEach(targetSelector, function (node) {
              if (node && node.offsetHeight && Number(node.offsetHeight) !== maxHeight) {
                node.style.height = maxHeight + 'px';
              }
            });
          }
        }

        $timeout(timerHandler, 50);
      }

      element.ready(function () {
        scope.$watch(function () {
          return element[0].offsetHeight;
        }, watchHandler);

        scope.$on('imagesLoaded.ALWAYS', watchHandler);
      });
    }

    directive = {
      restrict: 'A',
      scope: {
        sourceSelector: '@',
        targetSelector: '@'
      },
      link: link
    };

    return directive;
  }
}());

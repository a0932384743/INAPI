(function () {
  'use strict';

  angular.module('core')
    .directive('backToTop', backToTop);

  backToTop.$inject = [];

  function backToTop() {
    var directive = {};

    /* jshint unused:false */
    /* eslint no-unused-vars:0 */
    /* eslint "angular/ng_window_service":0 */
    /* eslint "angular/ng_angularelement":0 */
    /* global window, $ : false */
    function link(scope, element, attrs) {
      var targetContainer, targetOffset, windowOffset;
      targetContainer = angular.isDefined(scope.targetSelector) ? $(scope.targetSelector) : null;
      targetOffset = angular.isDefined(scope.targetOffset) ? Number(scope.targetOffset) : 0;
      windowOffset = angular.isDefined(scope.offset) ? Number(scope.offset) : 0;

      function scrollHandler(position, offset) {
        if (position <= offset) {
          $(element).fadeOut();
        } else {
          $(element).fadeIn();
        }
      }

      if (targetContainer) {
        targetContainer.scroll(function () {
          scrollHandler.call(this, $(this).scrollTop(), targetOffset);
        });
      }

      $(window).scroll(function () {
        scrollHandler.call(this, $(this).scrollTop(), windowOffset);
      });

      element.bind('click', function () {
        if (targetContainer) {
          targetContainer.animate({scrollTop: 0}, 'fast');
        }

        $('html, body').animate({scrollTop: 0}, 'fast');
      });
    }

    directive = {
      restrict: 'E',
      replace: true,
      template: '<div class="back-to-top"><i class="fa fa-chevron-up"></i></div>',
      scope: {
        targetSelector: '@',
        targetOffset: '@',
        offset: '@'
      },
      link: link
    };

    return directive;
  }
}());

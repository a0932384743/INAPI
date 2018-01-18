(function () {
  'use strict';

  /**
   * this directive "imagesLoaded" is just a custom version of https://github.com/bimal1331/angular-images-loaded
   */
  angular.module('core')
    .directive('imagesLoaded', imagesLoaded);

  imagesLoaded.$inject = ['$timeout', '$rootScope', '$q'];

  /* jshint unused:false */
  /* eslint no-unused-vars:0 */
  /* eslint no-underscore-dangle:0 */
  /* eslint no-cond-assign:0 */
  /* eslint no-extra-parens:0 */
  /* eslint no-shadow:0 */
  /* eslint "angular/ng_document_service":0 */
  /* global document, Image : false */
  function imagesLoaded($timeout, $rootScope, $q) {
    var directive = {}, cache = {},
        broadcastMessages = {
          progress: ['imagesLoaded.QUARTER', 'imagesLoaded.HALF', 'imagesLoaded.THREEQUARTERS', 'imagesLoaded.FULL'],
          successful: 'imagesLoaded.SUCCESS',
          complete: 'imagesLoaded.FAIL',
          always: 'imagesLoaded.ALWAYS'
        };

    // Helper functions
    function digestPromise(func) {
      $timeout(func, 0);
    }

    // Constructors
    function ImageNode(src, func, inBrowserCache) {
      this.loaded = undefined;
      this.loading = true;

      if (!inBrowserCache) {
        this.node = new Image();
        this.bind(func);
        this.node.src = src;
      } else {
        this.__onload(func, true);
      }
    }

    function ImagesCollection(useProgressEvents) {
      this.imagesCount = 0;
      this.imagesLoaded = 0;
      this.imagesFailed = 0;
      this.useProgressEvents = useProgressEvents;
    }

    function compile(tElem, tAttrs) {
      function link($scope, $element, $attrs) {
        var descendents = $element[0].childNodes, useProgressEvents = $attrs.useProgressEvents === 'yes',
            oldImageNodesCount = 0, documentImages = document.images, imageNodes;

        function watchHandler(newVal, oldVal) {
          var newImageNodesCount, collection;

          // if (newVal === oldVal) {
          //   return;
          // }

          imageNodes = $element.find('img');
          newImageNodesCount = imageNodes.length;

          // if (newImageNodesCount === oldImageNodesCount) {
          //   return;
          // }

          oldImageNodesCount = newImageNodesCount;

          collection = new ImagesCollection(useProgressEvents);

          digestPromise(function () {
            collection.whenImagesLoaded(imageNodes).then(
              function (data) {
                $rootScope.$broadcast(data);
                $rootScope.$broadcast(broadcastMessages.always);
              },
              function (error) {
                angular.noop(error);
              },
              function (progress) {
                if (useProgressEvents) {
                  $scope.$broadcast('imagesLoaded.PROGRESS', {status: progress});
                }
              }
            );
          });
        }

        $scope.$watch(function () {
          return documentImages.length;
        }, watchHandler);
      }

      return link;
    }

    ImageNode.prototype = {
      constructor: ImageNode,
      bind: function (func) {
        var _this = this;
        this.node.addEventListener('load', function () {
          _this.__onload(func, true);
        }, false);
        this.node.addEventListener('error', function () {
          _this.__onload(func, false);
        }, false);
      },
      __onload: function (func, success) {
        this.loaded = true;
        this.loading = false;

        if (success && this.node) {
          delete this.node;
        }

        func(success);
      }
    };

    ImagesCollection.prototype = {
      constructor: ImagesCollection,
      whenImagesLoaded: function (imageNodes) {
        var i = 0, defer = $q.defer(), totalImages = imageNodes.length, _this = this, imgElem, proxyImage;
        this.imagesCount = totalImages;

        function increment(bool) {
          var progress;

          if (bool) {
            _this.imagesLoaded++;
          } else {
            _this.imagesFailed++;
          }

          if (_this.useProgressEvents &&
            (progress = (_this.imagesLoaded + _this.imagesFailed) / Math.ceil(totalImages / 4)) &&
            (progress % 1 === 0) && progress < 4) {
            digestPromise(function () {
              defer.notify(broadcastMessages.progress[progress - 1]);
            });
          }

          if (_this.imagesLoaded + _this.imagesFailed === _this.imagesCount) {
            digestPromise(function () {
              defer.notify(broadcastMessages.progress[3]);
              defer.resolve((_this.imagesFailed > 0) ? broadcastMessages.complete : broadcastMessages.success);
            });
          }
        }

        function check(img) {
          var source = img.src, cachedElement = cache[source], proxyImage;

          if (cachedElement) {
            if (cachedElement.loaded) {
              // Image is in local cache and is loaded
              increment(true);
            } else if (cachedElement.loading) {
              // Image is currently being loaded and it's being checked again before successful load, so we wait for the image to load
              cachedElement.bind(increment);
            } else if (cachedElement.loaded === false) {
              // cachedElement.bind(increment);
              // cachedElement.node.src = source;
            }
          } else if (img.complete && img.naturalWidth > 0) {
            // Image is not in local cache but is present in browser's cache
            cache[source] = new ImageNode(source, increment, true);
          } else {
            // Image has not been loaded before, so we make a proxy image element and attach load listeners to it
            cache[source] = new ImageNode(source, increment);
          }
        }

        for (i = 0; i < this.imagesCount; i++) {
          imgElem = imageNodes[i];
          check(imgElem);
        }

        return defer.promise;
      }
    };

    // Directive configuration object
    directive = {
      restrict: 'A',
      compile: compile
    };

    return directive;
  }
}());

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

//# sourceMappingURL=images-loaded-directive.js.map

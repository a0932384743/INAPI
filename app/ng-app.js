/**
 * @description
 *  Initialize AngularJS app with constants loaded from the backend
 *  https://github.com/philippd/angular-deferred-bootstrap
 */

/* eslint no-alert:0 */
/* eslint "angular/ng_window_service":0 */
/* eslint "angular/ng_document_service":0 */
/* global document, window, alert : false */
(function() {
  'use strict';

  angular.element(document).ready(function() {
    var $injector, $http, $q, httpResult;
    $injector = angular.injector(['ng']);
    $http = $injector.get('$http');
    $q = $injector.get('$q');
    httpResult = {};

    $http.get('config.json' + '?' + new Date().getTime()).then(function(response) {
      angular.forEach(response.data, function(value, key) {
        var deferred = $q.defer();
        deferred.resolve(value);
        httpResult[key] = [function() {
          return deferred.promise;
        }];
      });
    }, function(response) {
      alert('WebApp could not initialization\n\nERROR: ' +
        response.statusText + (response.status ? ' [' + response.status + ']' : ''));
    }).then(function() {
      window.deferredBootstrapper.bootstrap({
        element: window.document.body,
        module: 'inapi',
        resolve: httpResult,
        onError: function(error) {
          alert('WebApp could not bootstrap\n\nERROR: ' + error);
        }
      });
    });
  });
}());
/* global document, window, alert : true */

(function () {
  'use strict';

  angular.module('core')
    .factory('ValidationSummary', ValidationSummary);

  ValidationSummary.$inject = [];

  function ValidationSummary() {
    var service = {}, msgArray = [];

    function push(msg) {
      msgArray.push('<li>' + msg + '</li>');

      return service;
    }

    function count() {
      return msgArray.length;
    }

    function clear() {
      msgArray = [];
    }

    function flush() {
      var msg = '';

      if (msgArray.length > 0) {
        msgArray.unshift('<div class="popup-text"><ul>');
        msgArray.push('</ul></div>');
        msg = msgArray.join('');
      }

      clear();

      return msg;
    }

    service.push = push;
    service.count = count;
    service.clear = clear;
    service.flush = flush;

    return service;
  }
}());

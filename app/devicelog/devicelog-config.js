(function () {
  'use strict';

  angular.module('devicelog')
    .config(config);

  config.$inject = ['momentPickerProvider'];

  function config(momentPickerProvider) {
    momentPickerProvider.options({
      /* Picker properties */
      locale: 'en',
      format: 'YYYY-MM-DD HH:mm',
      minView: 'year',
      maxView: 'day',
      startView: 'month',
      autoclose: true,
      today: false,
      keyboard: false,

      /* Extra: Views properties */
      leftArrow: '&larr;',
      rightArrow: '&rarr;',
      yearsFormat: 'YYYY',
      monthsFormat: 'MMM',
      daysFormat: 'D',
      hoursFormat: 'HH:[00]',
      minutesFormat: 'HH:mm',
      secondsFormat: 'ss',
      minutesStep: 5,
      secondsStep: 1
    });
  }
}());

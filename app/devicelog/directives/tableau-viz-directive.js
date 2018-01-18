(function () {
  'use strict';

  /**
   *  Using this directive is as easy as 1, 2, 3.
   *  1. Grab the Tableau API JavaScript library as well as this module.
   *    a. <script src="path/to/tableau-2.0.0.min.js"></script>
   *    b. <script src="path/to/angular-tableau.js"></script>
   *  2. Import the module into your app and dependencies.
   *  3. Use the directive like this:
   *       <tableau-viz height="500px" url="path/to/tableau-dashboard"
   *         filters="{field1: ['item1', 'item2'], dateField: {min: startDate, max: endDate}}">
   *       </tableau-viz>
   *    a. You can add 'showExportImage' and 'showExportPdf' to show export image or the export PDF (hidden by default)
   *    b. You can add 'showTabs' and 'showToolbar' to show tabs or the toolbar (hidden by default)
   *    c. Remember to add width or height, as appropriate for your layout (use the width and height
   *      attributes on the directive). Not sure which one you need? Try the height setting first.
   */

  angular.module('devicelog')
    .directive('tableauViz', TableauVizDirective);

  TableauVizDirective.$inject = ['$log', 'Tableau'];

  function TableauVizDirective($log, Tableau) {
    var directive, devCategory;

    // Define a function to adjust timezone to workbook
    function filterTimeZone(workbook, filterName, filterValue) {
      function getLocalTz() {
        return new Date().getTimezoneOffset() / -60;
      }

      if (workbook) {
        filterValue = filterValue || getLocalTz();
        workbook.changeParameterValueAsync(filterName, filterValue);
      }
    }

    // Define a function to apply filters to individual sheet
    function applyFilterToSheet(sheet, key, filter) {
      if (sheet) {
        if (filter.min && filter.max) {
          sheet.applyRangeFilterAsync(
            key,
            {
              min: filter.min,
              max: filter.max
            },
            Tableau.FilterUpdateType.REPLACE
          );
        } else {
          sheet.applyFilterAsync(key, filter, Tableau.FilterUpdateType.REPLACE);
        }
      }
    }

    // Define a function to apply filters to dashboard
    function applyFilters(viz, measure, filters) {
      var i, dash, filtersArr, filterValue, graphSheet, dataSheet;

      dash = viz.getWorkbook().getActiveSheet();
      filtersArr = Object.keys(filters || {});

      if (devCategory === 'OUTLET') {
        graphSheet = dash.getWorksheets().get(measure.value + 'Chart');
        dataSheet = dash.getWorksheets().get(measure.value + 'Data');
      } else if (devCategory === 'SENSOR') {
        graphSheet = dash.getWorksheets().get('SensorAttr' + measure.dataType + 'Chart');
        dataSheet = dash.getWorksheets().get('SensorAttr' + measure.dataType + 'Data');
      }

      for (i = 0; i < filtersArr.length; ++i) {
        filterValue = filters[filtersArr[i]];
        applyFilterToSheet(graphSheet, filtersArr[i], filterValue);
        applyFilterToSheet(dataSheet, filtersArr[i], filterValue);
      }
    }

    // Create the dashboard
    function createViz(scope, url, config, vizTarget, vizExporter) {
      var viz;
      viz = new Tableau.Viz(vizTarget, url, {
        width: config.width ? config.width : '100%',
        height: config.height ? config.height : '100%',
        hideTabs: angular.isDefined(config.hideTabs) ? config.hideTabs : true,
        hideToolbar: angular.isDefined(config.hideToolbar) ? config.hideToolbar : true,
        onFirstInteractive: function () {
          // Creates a PNG file of the current visualization
          function showExportImageDialog() {
            if (viz) {
              try {
                viz.showExportImageDialog();
              } finally {
                angular.noop();
              }
            }
          }

          // Shows a dialog allowing the user to select options for the export
          function showExportPDFDialog() {
            try {
              viz.showExportPDFDialog();
            } finally {
              angular.noop();
            }
          }

          // Show export icons
          function showExportIcons() {
            if (vizExporter) {
              vizExporter.style.display = 'block';
            }
          }

          filterTimeZone(viz.getWorkbook(), 'timezone');
          applyFilters(viz, config.measure, config.filters);
          showExportIcons();

          scope.$watch('filters', function (newFilters) {
            if (viz) {
              viz.revertAllAsync();
              filterTimeZone(viz.getWorkbook(), 'timezone');
            }

            if (newFilters) {
              applyFilters(viz, config.measure, newFilters);
            }

            showExportIcons();
          });

          scope.showExportImageDialog = showExportImageDialog;
          scope.showExportPDFDialog = showExportPDFDialog;
        }
      });

      return viz;
    }

    function link(scope, element) {
      var viz, vizTarget, vizExporter, vizConfig;

      devCategory = scope.category;
      vizTarget = element[0].children[1];
      vizExporter = element[0].children[0];
      vizConfig = {
        hideTabs: angular.isDefined(scope.showTabs) && scope.showTabs.toString() === 'true' ? false : true,
        hideToolbar: angular.isDefined(scope.showToolbar) && scope.showToolbar.toString() === 'true' ? false : true,
        width: scope.width,
        height: scope.height,
        measure: {},
        filters: {}
      };

      if (devCategory !== 'OUTLET' && devCategory !== 'SENSOR') {
        $log.debug('Error: No proper device category for Tableau Viz.');
        return;
      }

      function destroy() {
        if (viz) {
          vizExporter.style.display = 'none';
          viz.dispose();
        }
      }

      // We need to have a URL to do anything
      scope.$watch('url', function (newVal) {
        if (newVal) {
          destroy();
          vizConfig.url = newVal;
          vizConfig.measure = angular.merge({}, scope.measure);
          vizConfig.filters = angular.merge({}, scope.filters);
          viz = createViz(scope, newVal, vizConfig, vizTarget, vizExporter);
        }
      });

      // Destroy the dashboard and interval timers upon destroying directive
      scope.$on('$destroy', destroy);
    }

    directive = {
      restrict: 'EA',
      template:
        '<div style="margin: auto;" ng-style="{width: width || \'100%\', display: \'none\', }">' +
        '<div style="text-align: right;">' +
        '<button type="button" title="Export Image" ng-click="showExportImageDialog()" ng-if="showExportImage">' +
        '<i class="fa fa-file-image-o"></i>' +
        '</button>' +
        '<button type="button" title="Export PDF" ng-click="showExportPDFDialog()" ng-if="showExportPdf">' +
        '<i class="fa fa-file-text-o"></i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div style="margin: auto;">' +
        '</div>',
      scope: {
        width: '@',
        height: '@',
        category: '@',
        url: '@',
        measure: '=',
        filters: '=',
        showTabs: '=',
        showToolbar: '=',
        showExportImage: '=',
        showExportPdf: '='
      },
      link: link
    };

    return directive;
  }
}());

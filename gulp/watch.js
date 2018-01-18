'use strict';

module.exports = function (gulp, $, config) {
  gulp.task('browserSync', function () {
    $.browserSync({
      host: config.host,
      open: 'internal',
      port: config.port,
      server: {
        baseDir: config.buildDir
      }
    });
  });

  gulp.task('watch', function () {
    $.browserSync.reload();
    gulp.watch([config.unitTestFiles], ['unitTest']);
    gulp.watch([config.appFiles, '!' + config.unitTestFiles], ['build', $.browserSync.reload])
      .on('change', function (event) {
        if (event.type === 'deleted') {
          $.cached.caches = {};
          $.remember.forgetAll('lint');
          $.remember.forgetAll('markup');
          $.remember.forgetAll('styles');
          $.remember.forgetAll('images');
          $.remember.forgetAll('scripts');
        }
      });
  });
};

'use strict';

var _ = require('underscore.string')
  , fs = require('fs')
  , path = require('path')

  , bowerDir = JSON.parse(fs.readFileSync('.bowerrc')).directory + path.sep;

module.exports = function (gulp, $, config) {
  var isProd = $.yargs.argv.stage === 'prod';

  // delete build directory
  gulp.task('clean', function () {
    return $.del(config.buildDir);
  });

  // compile markup files and copy into build directory
  gulp.task('markup', ['clean'], function () {
    return gulp.src([
      config.appMarkupFiles
    ])
      .pipe($.cached('markup'))
      .pipe($.remember('markup'))
      .pipe(gulp.dest(config.buildDir));
  });

  // compile styles and copy into build directory
  gulp.task('styles', ['clean'], function () {
    return gulp.src([
      config.appStyleFiles,
      '!' + path.join(config.appDir, 'css/**/*.less')
    ])
      .pipe($.plumber({errorHandler: function (err) {
        $.notify.onError({
          title: 'Error linting at ' + err.plugin,
          subtitle: ' ', //overrides defaults
          message: err.message.replace(/\u001b\[.*?m/g, ''),
          sound: ' ' //overrides defaults
        })(err);

        this.emit('end');
      }}))
      .pipe($.cached('styles'))
      .pipe($.less({
        paths: [
          path.join(config.appDir, 'css/**/*.less'),
          path.join('bower_components', '/bootstrap/less/**/*.less')]
      }))
      .pipe($.autoprefixer())
      .pipe($.if(isProd, $.cssRebaseUrls({
        root: config.appDir
      })))
      .pipe($.modifyCssUrls({
        modify: function (url) {
          // determine if url is using http, https, or data protocol
          // cssRebaseUrls rebases these URLs, too, so we need to fix that
          if (url.indexOf('http:') > -1 || url.indexOf('https:') > -1 || url.indexOf('data:') > -1) {
            return url.substring(beginUrl, url.length);
          }

          // prepend all other urls
          return '../' + url;
        }
      }))
      .pipe($.remember('styles'))
      .pipe($.if(isProd, $.concat('app.min.css')))
      .pipe($.if(isProd, $.cssmin()))
      //.pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.buildCss));
  });

  // compile scripts and copy into build directory
  gulp.task('scripts', ['clean', 'analyze', 'markup'], function () {
    var cacheFilter = $.filter(['**/*.html', 'i18n/**/*.json'], {restore: true})
      , jsFilter = $.filter('**/*.js', {restore: true});

    return gulp.src([
      config.appScriptFiles,
      config.buildDir + '**/*.html',
      path.join(config.appDir, '**/*.json'),
      '!**/*_test.*',
      '!**/index.html'
    ])
      .pipe($.cached('scripts'))
      .pipe($.sourcemaps.init())
      .pipe($.if(isProd, cacheFilter))
      .pipe($.if(isProd, $.ngHtml2js({
        // lower camel case all app names
        moduleName: _.camelize(_.slugify(_.humanize(require('../package.json').name))),
        declareModule: false
      })))
      .pipe($.if(isProd, cacheFilter.restore))
      .pipe($.remember('scripts'))
      .pipe(jsFilter)
      .pipe($.if(isProd, $.angularFilesort()))
      .pipe($.if(isProd, $.concat('app.min.js')))
      .pipe($.if(isProd, $.ngAnnotate()))
      .pipe($.if(isProd, $.uglify()))
      //.pipe($.if(isProd, $.rev()))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(config.buildJs))
      .pipe(jsFilter.restore);
  });

  // inject custom CSS and JavaScript into index.html
  gulp.task('inject', ['markup', 'styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js', {restore: true});

    return gulp.src(config.buildDir + 'index.html')
      .pipe($.inject(gulp.src([
          config.buildCss + '**/*',
          config.buildJs + '**/*'
        ])
        .pipe(jsFilter)
        .pipe($.angularFilesort())
        .pipe(jsFilter.restore), {
          addRootSlash: false,
          ignorePath: config.buildDir
        })
      )
      .pipe(gulp.dest(config.buildDir));
  });

  // copy bower components into build directory
  gulp.task('bowerCopy', ['inject'], function () {
    var cssFilter = $.filter('**/*.css', {restore: true})
      , jsFilter = $.filter('**/*.js', {restore: true});

    return gulp.src($.mainBowerFiles(), {base: bowerDir})
      .pipe(cssFilter)
      .pipe($.if(isProd, $.modifyCssUrls({
        modify: function (url, filePath) {
          if (url.indexOf('data:') === 0) {
            return url;
          }

          if (url.indexOf('http') !== 0) {
            filePath = path.dirname(filePath) + path.sep;
            filePath = filePath.substring(filePath.indexOf(bowerDir) + bowerDir.length,
              filePath.length);
          }
          url = path.normalize(filePath + url);
          url = url.replace(/[/\\]/g, '/');
          return url;
        }
      })))
      .pipe($.if(isProd, $.concat('vendor.min.css')))
      .pipe($.if(isProd, $.cssmin()))
      //.pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.extDir))
      .pipe(cssFilter.restore)
      .pipe(jsFilter)
      .pipe($.if(isProd, $.concat('vendor.min.js')))
      .pipe($.if(isProd, $.uglify({
        preserveComments: $.uglifySaveLicense
      })))
      //.pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.extDir))
      .pipe(jsFilter.restore);
  });

  // inject bower components into index.html
  gulp.task('bowerInject', ['bowerCopy'], function () {
    if (isProd) {
      return gulp.src(config.buildDir + 'index.html')
        .pipe($.inject(gulp.src([
          config.extDir + 'vendor*.css',
          config.extDir + 'vendor*.js'
        ], {
          read: false
        }), {
          starttag: '<!-- bower:{{ext}} -->',
          endtag: '<!-- endbower -->',
          addRootSlash: false,
          ignorePath: config.buildDir
        }))
        .pipe($.htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: {compatibility: 'ie7'}
        }))
        .pipe($.replace(/(\.min)(\.css|\.js)/g , '$1$2' + '?v=' + require('../package.json').version))
        .pipe(gulp.dest(config.buildDir));
    } else {
      return gulp.src(config.buildDir + 'index.html')
        .pipe($.wiredep.stream({
          exclude: ['/bootstrap.js'],
          ignorePath: '../../' + bowerDir.replace(/\\/g, '/'),
          fileTypes: {
            html: {
              replace: {
                css: function (filePath) {
                  return '<link rel="stylesheet" href="' + config.extDir.replace(config.buildDir, '') +
                    filePath + '">';
                },
                js: function (filePath) {
                  return '<script src="' + config.extDir.replace(config.buildDir, '') +
                    filePath + '"></script>';
                }
              }
            }
          }
        }))
        .pipe(gulp.dest(config.buildDir));
    }
  });

  // copy Bower fonts and images into build directory
  gulp.task('bowerAssets', ['clean'], function () {
    var assetFilter = $.filter('**/*.{eot,otf,svg,ttf,woff,woff2,gif,jpg,jpeg,png}', {restore: true});
    return gulp.src($.mainBowerFiles(), {base: bowerDir})
      .pipe(assetFilter)
      .pipe(gulp.dest(config.extDir))
      .pipe(assetFilter.restore);
  });

  // copy custom fonts into build directory
  gulp.task('fonts', ['clean'], function () {
    var fontFilter = $.filter('**/*.{eot,otf,svg,ttf,woff,woff2}', {restore: true});
    return gulp.src([config.appFontFiles])
      .pipe(fontFilter)
      .pipe(gulp.dest(config.buildFonts))
      .pipe(fontFilter.restore);
  });

  // copy optional favicon in app directory
  gulp.task('favicon', ['clean'], function () {
    return gulp.src(path.join(config.appDir, 'favicon.ico'))
      .pipe(gulp.dest(config.buildDir));
  });

  // copy and optimize images into build directory
  gulp.task('images', ['clean'], function () {
    return gulp.src(config.appImageFiles)
      .pipe($.cached('images'))
      .pipe($.if(isProd, $.imagemin()))
      .pipe($.remember('images'))
      .pipe(gulp.dest(config.buildImages));
  });

  gulp.task('copyTemplates', ['bowerInject'], function () {
    // always copy templates to testBuild directory
    var stream = $.streamqueue({objectMode: true});

    stream.queue(gulp.src([config.buildDirectiveTemplateFiles]));

    return stream.done()
      .pipe(gulp.dest(config.buildTestDirectiveTemplatesDir));
  });

  gulp.task('deleteTemplates', ['copyTemplates'], function (cb) {
    // only delete templates in production
    // the templates are injected into the app during prod build
    if (!isProd) {
      return cb();
    }

    gulp.src([config.buildDir + '**/*.html'])
      .pipe(gulp.dest('tmp/' + config.buildDir))
      .on('end', function () {
        $.del([
          config.buildDir + '*',
          '!' + config.buildCss,
          '!' + config.buildFonts,
          '!' + config.buildImages,
          '!' + config.buildJs,
          '!' + config.extDir,
          '!' + config.buildDir + 'index.html'
        ], {mark: true})
          .then(function () {
            cb();
          });
      });
  });

  // copy assets into build directory except 'i18n/**/*.json' in production
  // configure i18n to use template cache with $translateProvider.useLoaderCache('$templateCache');
  gulp.task('assets', ['deleteTemplates'], function () {
    var nonCacheFilter = $.filter(['**/*', '!i18n/**/*.json'], {restore: true});
    return gulp.src([
      'favicon.ico',
      'apple-touch-icon.png',
      'browserconfig.xml',
      'manifest.json',
      'config.json',
      'i18n/**/*.*'
    ], {
      cwd: path.join(config.appDir, '**')
    })
      .pipe($.if(isProd, nonCacheFilter))
      .pipe(gulp.dest(config.buildDir))
      .pipe($.if(isProd, nonCacheFilter.restore));
  });

  gulp.task('build', ['assets', 'deleteTemplates', 'bowerAssets', 'images', 'favicon', 'fonts']);
};

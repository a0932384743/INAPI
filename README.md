# DPA (inapi)

*Generated with [ng-poly](https://github.com/dustinspecker/generator-ng-poly/tree/v0.13.0) version 0.13.0*

## Setup
1. Install [Node.js](http://nodejs.org/)
 -- This will also install npm.
2. Run `npm install -g bower gulp yo generator-ng-poly@0.13.0`
 -- This enables Bower, Gulp, and Yeoman generators to be used from command line.
3. Run `npm install` to install this project's dependencies
4. Run `bower install` to install client-side dependencies
5. Use [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly) to create additional components

## Gulp tasks
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
- **A localhost must be running** - `gulp dev`

---

# DPA (inapi) - Traditional Chinese (繁體中文)

## 安裝 NodeJS with NPM
[NodeJS](https://nodejs.org/en/download/)

1. 下載 LTS version with npm
[NodeJS LTS](https://nodejs.org/dist/v6.9.5/node-v6.9.5-win-x64.zip)

2. 解壓縮至所需路徑
```
d:\javascript\
	└── node\
		└── node_modules\
			└── npm\
```

3. 建立其它套件安裝目錄及快取目錄
```
d:\javascript\
	├── npm-cache\
	└── npm\
		└── node_modules\
```

4. 設定環境變數
`set NODE_HOME=d:\javascript\node`
`set NPM_HOME=d:\javascript\npm`
`set NODE_PATH=d:\javascript\npm\node_modules`
`set PATH=%NODE_HOME%;%NPM_HOME%;%PATH%`

5. 檢差安裝是否正常
`node --version`
`npm --version`

6. 設定其它套件安裝目錄及快取目錄，並檢查(`%USERPROFILE%\.npmrc`)
`npm config set prefix "d:\javascript\npm"`
`npm config get prefix`
`npm config set cache "d:\javascript\npm-cache"`
`npm config get cache`

## 安裝 Git for windows
[Git](https://github.com/git-for-windows/git/releases)

1. 下載 Git portable version
[Git portable version](https://github.com/git-for-windows/git/releases/download/v2.11.1.windows.1/PortableGit-2.11.1-64-bit.7z.exe)

2. 解壓縮至所需路徑
```
d:\javascript
	└── git
```

3. 設定環境變數
`set GIT_HOME=d:\javascript\git`
`set PATH=%GIT_HOME%\cmd;%PATH%`

4. 檢差安裝是否正常
`git --version`

5. 設定Git使用https代替git通訊協定，並檢查(`%USERPROFILE%\.gitconfig`)
`call git config --system url."https://".insteadOf git://`
`call git config --system url."https://".insteadOf`
`call git config --global url."https://".insteadOf git://`
`call git config --global url."https://".insteadOf`

6. 測試使用npm安裝新套件(Ex. rimraf, static ...)
`npm install rimraf -g`

## 安裝 Bower、Gulp、Yeoman、Yeoman Generators
[Yeoman](]http://yeoman.io/generators/)

1. 安裝Bower、Gulp、Yeoman套件
`npm install bower gulp yo -g`

2. 檢差安裝是否正常
`yo --version`
`gulp --version`
`bower --version`

3. 安裝所需Yeoman Generator (Ex. generator-ng-poly)
`npm install generator-ng-poly@0.13.0 -g`

## 使用 generator-ng-poly (Yeoman Generator) 產生專案
[generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly)

1. 建立工作目錄，並進入此目錄
```
d:\javascript
	└── workspace
```

2. 新建專案
`yo ng-poly --app-dir=app --unit-test-dir=test --skip-install`

3. 依序回答及選擇專案所需的項目
> [?] What is the app's name? app
> [?] Which version of Angular should be used? (1)1.4.*
> [?] Which structure should be used? (2)module-type {三層式架構controller在controllers資料夾}
> [?] Which is the preferred markup language? (2)HTML
> [?] Which is the preferred application scripting language? (3)JavaScript(ES5)
> [?] Want to use Controller As syntax? Yes
> [?] Should directives be generated using a templateUrl (and markup file) instead of an inline template? Yes
> [?] Which is the preferred test scripting language? (3)JavaScript(ES5)
> [?] Which is the preferred unit testing framework? (1)Jasmine
> [?] Which is the preferred e2e testing framework? (1)Jasmine
> [?] Which is the preferred style language? (2)LESS
> [?] Should Polymer support be enabled? No
> [?] Should a framework be setup? (3)Bootstrap with UI Bootstrap
> [?] Should ngRoute be used instead of UI Router? No
> [?] Which additional Bower components should be installed? (3)Angular Cookies(4)Angular Messages(6)Angular Sanitize(8)Font Awesome(9)Lo-Dash

4. 更改專案資料夾名稱 `rename app DPA`，並進入此資料夾

5. 修改專案相依套件版本
> [bower.json]
``` javascript
  "dependencies": {
    "angular": "~1.5.*",
    "angular-cookies": "~1.5.*",
    "angular-messages": "~1.5.*",
    "angular-sanitize": "~1.5.*",
    "angular-ui-router": "~0.4.2",
    "angular-bootstrap": "~0.13.4",
    "bootstrap": "~3.2.0",
    "font-awesome": "~4.2.0",
    "lodash": "~3.9.0"
  },
  "devDependencies": {
    "angular-mocks": "~1.5.*"
  },
```

6. 安裝所有相依套件
`npm install && bower install`

7. 安裝及修改專案其它相依套件 (Ex. angular-dialog-service, angular-loading-bar, angular-deferred-bootstrap, angular-chart.js ...)
`bower install angular-dialog-service@5.2.8 --save`
`bower install angular-deferred-bootstrap@0.1.9 --save`
`bower install angular-ui-grid@4.0.2 --save`
`bower install ng-lodash@0.3.0 --save`
`bower install angular-spinner@0.8.1 --save`

> [bower.json]
``` javascript
  "overrides": {
    "angular": {
      "dependencies": {
        "jquery": "*"
      }
    },
    "angular-dialog-service": {
      "main": [
        "dist/dialogs.css",
        "dist/dialogs.js",
        "dist/dialogs-default-translations.js"
      ]
    },
    "angular-ui-grid": {
      "main": [
        "./ui-grid.css",
        "./ui-grid.js",
        "./ui-grid.eot",
        "./ui-grid.svg",
        "./ui-grid.ttf",
        "./ui-grid.woff"
      ]
    },
  }
```

8. 安裝開發環境客制化相依套件
`npm install gulp-replace --save-dev`
`npm install gulp-cached --save-dev`
`npm install gulp-remember --save-dev`

9. 開發環境客制化修改下列檔案
> [.jscsrc:34]
``` javascript
-  "requireCamelCaseOrUpperCaseIdentifiers": true,
+  "requireCamelCaseOrUpperCaseIdentifiers": null,
```

> [gulp\build.js:55]
``` javascript
-    .pipe($.if(isProd, $.concat('app.css')))
+    .pipe($.if(isProd, $.concat('app.min.css')))
    .pipe($.if(isProd, $.cssmin()))
-    .pipe($.if(isProd, $.rev()))
+    //.pipe($.if(isProd, $.rev()))
```

> [gulp\build.js:82]
``` javascript
-    .pipe($.if(isProd, $.concat('app.js')))
+    .pipe($.if(isProd, $.concat('app.min.js')))
    .pipe($.if(isProd, $.ngAnnotate()))
    .pipe($.if(isProd, $.uglify()))
-    .pipe($.if(isProd, $.rev()))
+    //.pipe($.if(isProd, $.rev()))
```

> [gulp\build.js:133]
``` javascript
-    .pipe($.if(isProd, $.concat('vendor.css')))
+    .pipe($.if(isProd, $.concat('vendor.min.css')))
    .pipe($.if(isProd, $.cssmin()))
-    .pipe($.if(isProd, $.rev()))
+    //.pipe($.if(isProd, $.rev()))
```

> [gulp\build.js:139]
``` javascript
-    .pipe($.if(isProd, $.concat('vendor.js')))
+    .pipe($.if(isProd, $.concat('vendor.min.js')))
    .pipe($.if(isProd, $.uglify({
      preserveComments: $.uglifySaveLicense
    })))
-    .pipe($.if(isProd, $.rev()))
+    //.pipe($.if(isProd, $.rev()))
```

> [gulp\build.js:163]
``` javascript
      .pipe($.htmlmin({
        collapseWhitespace: true,
-        removeComments: true
+        removeComments: true,
+        minifyJS: true,
+        minifyCSS: {compatibility: 'ie7'}
      }))
+	  .pipe($.replace(/(\.min)(\.css|\.js)/g , '$1$2' + '?v=' + require('../package.json').version))
```

> [gulp\build.js:172]
``` javascript
      return gulp.src(config.buildDir + 'index.html')
        .pipe($.wiredep.stream({
-          exclude: [/bootstrap[.]js/],
+          exclude: ['/bootstrap.js'],
```

> [gulp\build.js:27]
``` javascript
    return gulp.src([
-      config.appStyleFiles
+      config.appStyleFiles,
+      '!' + path.join(config.appDir, 'css/**/*.less')
    ])
```

> [gulp\build.js:41]
``` javascript
-      .pipe($.less())
+      .pipe($.less({
+        paths: [
+          path.join(config.appDir, 'css/**/*.less'),
+          path.join('bower_components', '/bootstrap/less/**/*.less')]
+      }))
      .pipe($.autoprefixer())
-      .pipe($.if(isProd, $.cssRebaseUrls()))
+      .pipe($.if(isProd, $.cssRebaseUrls({
+        root: config.appDir
+      })))
-      .pipe($.if(isProd, $.modifyCssUrls({
+      .pipe($.modifyCssUrls({
        modify: function (url) {
          // determine if url is using http, https, or data protocol
          // cssRebaseUrls rebases these URLs, too, so we need to fix that
          if (url.indexOf('http:') > -1 || url.indexOf('https:') > -1 || url.indexOf('data:') > -1) {
            return url.substring(beginUrl, url.length);
          }

          // prepend all other urls
          return '../' + url;
        }
-      })))
+      }))
```

> [gulp\build.js:70]
``` javascript
-    var htmlFilter = $.filter('**/*.html', {restore: true})
+    var cacheFilter = $.filter(['**/*.html', 'i18n/**/*.json'], {restore: true})
      , jsFilter = $.filter('**/*.js', {restore: true});

    return gulp.src([
      config.appScriptFiles,
      config.buildDir + '**/*.html',
+      path.join(config.appDir, '**/*.json'),
      '!**/*_test.*',
      '!**/index.html'
    ])
      .pipe($.sourcemaps.init())
-      .pipe($.if(isProd, htmlFilter))
+      .pipe($.if(isProd, cacheFilter))
      .pipe($.if(isProd, $.ngHtml2js({
        // lower camel case all app names
        moduleName: _.camelize(_.slugify(_.humanize(require('../package.json').name))),
        declareModule: false
      })))
-      .pipe($.if(isProd, htmlFilter.restore))
+      .pipe($.if(isProd, cacheFilter.restore))
```

> [gulp\build.js:269]
``` javascript
+  // copy assets into build directory except 'i18n/**/*.json' in production
+  // configure i18n to use template cache with $translateProvider.useLoaderCache('$templateCache');
+  gulp.task('assets', ['deleteTemplates'], function () {
+    var nonCacheFilter = $.filter(['**/*', '!i18n/**/*.json'], {restore: true});
+    return gulp.src([
+      'favicon.ico',
+      'apple-touch-icon.png',
+      'browserconfig.xml',
+      'manifest.json',
+      'config.json',
+      'i18n/**/*.*'
+    ], {
+      cwd: path.join(config.appDir, '**')
+    })
+      .pipe($.if(isProd, nonCacheFilter))
+      .pipe(gulp.dest(config.buildDir))
+      .pipe($.if(isProd, nonCacheFilter.restore));
+  });
+
-  gulp.task('build', ['deleteTemplates', 'bowerAssets', 'images', 'favicon', 'fonts']);
+  gulp.task('build', ['assets', 'deleteTemplates', 'bowerAssets', 'images', 'favicon', 'fonts']);

```

> [gulp\watch.js:7]
``` javascript
-    open: 'external',
+    open: 'internal',
```

## 開發 generator-ng-poly (Yeoman Generator) 產生的專案指令
[generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly)

1. 修改專案版號
> [package.json:3]
``` javascript
  "version": "0.0.1",
```

> [bower.json:3]
``` javascript
  "version": "0.0.1",
```

2. AngularJS Tasks
> `yo ng-poly:constant` (產生constant和它的測試)
> `yo ng-poly:controller` (產生controller和它的測試)
> `yo ng-poly:decorator` (產生decorator和它的測試)
> `yo ng-poly:directive` (產生directive和它的template及測試)
> `yo ng-poly:factory` (產生factory和它的測試)
> `yo ng-poly:filter` (產生filter和它的測試)
> `yo ng-poly:module` (產生module並創建route。 更新父模塊的相依賴關係)
> `yo ng-poly:provider` (產生provider和它的測試)
> `yo ng-poly:route` (產生route並生成controller和view)
> `yo ng-poly:service` (產生service和它的測試)
> `yo ng-poly:value` (產生value和它的測試)
> `yo ng-poly:view` (產生view和它的style)

3. Gulp Tasks
> `gulp lint` (語法檢查)
> `gulp/gulp dev` (啟動localhost伺服器，並在預設瀏覽器執行專案，使用--stage prod參數將壓縮HTML、CSS、JS)
> `gulp clean` (刪除編譯目錄的內容)
> `gulp clean:test` (刪除以前編譯的單元測試)
> `gulp build` (編譯專案，使用--stage prod參數將壓縮HTML、CSS、JS)
> `gulp unitTest` (通過Karma運行單元測試並創建代碼覆蓋率報告)
> `gulp webdriverUpdate` (下載Selenium服務器和Chrome驅動程序進行e2e測試)
> `gulp e2eTest` (通過Protractor運行e2e測試，須在運行gulp e2eTest之前啟動localhost伺服器)

const gulp = require('gulp')
const gutil = require('gulp-util')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')
const webpack = require('webpack')
const WebpackDevServer = require("webpack-dev-server")
const webpackConfig = require('./webpack.config.js')

gulp.task('styles', () => {
  return gulp.src('static/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('static/css'))
})

// The development server (the recommended option for development)
gulp.task("default", ["build-dev"])

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev", "sass:build-dev"], function() {
  gulp.watch(["client/**/*"], ["webpack:build-dev"])
  gulp.watch('./static/sass/**/*.scss', ['sass:build-dev'])
  nodemon(require('./nodemon.json'))
})

// Production build
gulp.task("build", ["webpack:build", "sass:build"])

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig)
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  )

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err)
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }))
    callback()
  })
})

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig)
myDevConfig.devtool = "sourcemap"
myDevConfig.debug = true

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig)

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err)
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }))
    callback()
  })
})

/*
 * SASS
 */
gulp.task("sass:build", function(callback) {
  gulp.src('./static/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/css')) 
  callback()
})

gulp.task("sass:build-dev", ['sass:build'])

const { src, dest, series, parallel, watch } = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const htmlmin = require('gulp-htmlmin');
const { deleteAsync } = require('del');   // ES module compatible
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const path = require('path');

// Paths
const paths = {
  src: 'src',
  pages: 'src/pages/**/*.njk',
  templates: 'src/pages/templates', // ✅ templates inside pages
  assets: 'src/assets',
  dest: 'docs' // output to docs/ for GitHub Pages
};

// Clean
function clean() {
  return deleteAsync([paths.dest + '/**', '!' + paths.dest]);
}

// Templates: compile Nunjucks pages
function templates() {
  return src(paths.pages)
    .pipe(data(file => {
      const dataPath = path.join(__dirname, paths.src, 'data', 'site.json');
      return JSON.parse(fs.readFileSync(dataPath));
    }))
    .pipe(nunjucksRender({
      path: [paths.templates] // look for templates here
    }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest(paths.dest));
}

// Styles: copy & minify
function styles() {
  return src(paths.assets + '/css/**/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest(paths.dest + '/assets/css'))
    .pipe(browserSync.stream());
}

// Scripts: copy & minify
function scripts() {
  return src(paths.assets + '/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify().on('error', e => {
      console.log(e.toString());
      this.emit('end');
    }))
    .pipe(dest(paths.dest + '/assets/js'))
    .pipe(browserSync.stream());
}

// Images
function images() {
  return src(paths.assets + '/img/**/*')
    .pipe(dest(paths.dest + '/assets/img'));
}

// Copy other static files
function copyStatic() {
  return src([paths.assets + '/static/**/*'], { allowEmpty: true })
    .pipe(dest(paths.dest + '/assets/static'));
}

// Dev server + watch
function serve() {
  browserSync.init({
    server: { baseDir: paths.dest },
    port: 3000,
    open: true
  });

  watch(paths.assets + '/css/**/*.css', styles);
  watch(paths.assets + '/js/**/*.js', scripts);
  watch([paths.templates + '/**/*.njk', paths.pages, paths.src + '/data/**/*.json'], templates)
    .on('change', browserSync.reload);
  watch(paths.assets + '/img/**/*', images).on('change', browserSync.reload);
}

// Build
const build = series(
  clean,
  parallel(styles, scripts, images, copyStatic),
  templates
);

// Default
exports.default = series(build, serve);
exports.build = build;
exports.serve = series(build, serve);

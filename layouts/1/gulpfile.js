const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const terser = require("gulp-terser");
const urlAdjuster = require("gulp-css-url-adjuster");
const minify = require("gulp-minify-css");
const babel = require("gulp-babel");

function scss() {
  return gulp
    .src("src/styles/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(
      urlAdjuster({
        prepend: "../src/",
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(minify({ processImport: false }))
    .pipe(gulp.dest("public", { sourcemaps: "." }));
}

function js() {
  return gulp
    .src("src/js/**/*.js", { sourcemaps: true })
    .pipe(
      babel({
        plugins: [
          "@babel/plugin-transform-modules-commonjs"
        ],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("public", { sourcemaps: "." }));
}

function browsersyncServe(cb) {
  sync.init({
    server: {
      port: 5001,
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  sync.reload();
  cb();
}

function watch() {
  gulp.watch(["*.html", "src/**/*.html"], browsersyncReload);
  gulp.watch(
    ["src/**/*.scss", "src/**/*.js"],
    gulp.series(scss, js, browsersyncReload)
  );
}

exports.default = gulp.series(gulp.parallel(scss, js), browsersyncServe, watch);

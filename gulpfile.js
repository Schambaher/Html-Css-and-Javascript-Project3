const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Imagenes
const cache = require("gulp-cache");
const gulpWebp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const gulpAvif = require("gulp-avif");

//Javascript
const terser = require("gulp-terser-js");

function convertToWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{jpg,png}")
    .pipe(gulpWebp(opciones))
    .pipe(dest("build/img"));

  done();
}

function convertToAvif(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{jpg,png}")
    .pipe(gulpAvif(opciones))
    .pipe(dest("build/img"));

  done();
}

function convertToPng(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{jpg,png}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}

function compileSass(done) {
  src("src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
  done();
}

function compileJavascript(done) {
  src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/js"));
  done();
}

function watchSassAndJavascript() {
  watch("src/sass/**/*.scss", compileSass);
  watch("src/js/**/*.js", compileJavascript);
}

exports.convertImage = parallel(convertToWebp, convertToPng, convertToAvif);
exports.sass = compileSass;
exports.javascript = compileJavascript;
exports.default = watchSassAndJavascript;

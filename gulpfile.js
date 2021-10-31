const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//Imagenes
const cache = require('gulp-cache');
const gulpWebp = require("gulp-webp");
const imagemin = require('gulp-imagemin');
const gulpAvif = require('gulp-avif');


function convertToWebp (done) {
    const opciones = {
        quality: 50
    }
    src("src/img/**/*.{jpg,png}")
        .pipe( gulpWebp(opciones) )
        .pipe( dest("build/img") );

    done();
}

function convertToAvif (done) {
    const opciones = {
        quality: 50
    }
    src("src/img/**/*.{jpg,png}")
        .pipe( gulpAvif(opciones) )
        .pipe( dest("build/img") );

    done();
}

function convertToPng ( done ) {
    const opciones = {
        optimizationLevel : 3
    }
    src("src/img/**/*.{jpg,png}")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"));

    done();
}

function compileSass (done) {
    src("src/sass/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest("build/css"))
    done();
}

function compileJavascript (done) {
    src("src/js/**/*.js")
        .pipe(dest("build/js"))
    done();
}

function watchSassAndJavascript () {
    watch("src/sass/**/*.scss", compileSass);
    watch("src/js/**/*.js", compileJavascript);
}

exports.convertImage = parallel(convertToWebp, convertToPng, convertToAvif);
exports.sass = compileSass;
exports.javascript = compileJavascript;
exports.default = watchSassAndJavascript;
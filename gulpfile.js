const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const gulpWebp = require("gulp-webp");

function convertToWebp () {
    return src("./src/img/*.jpg")
            .pipe(gulpWebp())
            .pipe(dest("./build/img"))
}

function compileSass () {
    return src("src/sass/**/*.scss")
            .pipe(plumber())
            .pipe(sass())
            .pipe(dest("build/css"))
}

function watchSass () {
    watch("./src/sass/**/*.scss", compileSass);
}

exports.webp = convertToWebp;
exports.sass = compileSass;
exports.default = watchSass;
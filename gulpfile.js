const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const gulpWebp = require("gulp-webp");

function convertToWebp () {
    return src("./src/img/*.jpg")
            .pipe(gulpWebp())
            .pipe(dest("./build/img"))
}

function compileSass () {
    return src("./src/scss/**/*.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(dest("./build/css"))
}

function watchSass () {
    watch("./src/scss/**/*.scss", compileSass);
}

exports.webp = convertToWebp;
exports.sass = compileSass;
exports.default = watchSass;
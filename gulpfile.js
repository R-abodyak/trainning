var gulp = require("gulp");
var sass = require("gulp-sass");


gulp.task("to_css", function() {
    return gulp.src("SASS/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
});
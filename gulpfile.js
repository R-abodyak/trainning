var gulp = require("gulp");
var sass = require("gulp-sass");
var watch = require("gulp-watch");

gulp.task("to_css", function() {
    return gulp.src("SASS/styles.scss")
        .pipe(sass({ style: 'compressed' }))
        .pipe(gulp.dest("css"))
});

gulp.task("watch", function() {
    return gulp.watch("SASS/*.scss", gulp.series('to_css'))
});

/*
gulp.task("sass:watch", () => watchSass([
        "SASS/style..{scss,css}",
        ""
    ])
    .pipe(sass())
    .pipe(gulp.dest("./css")));*/
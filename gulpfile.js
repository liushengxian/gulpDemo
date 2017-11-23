var gulp = require("gulp");
var less = require("gulp-less");
var watch = require("gulp-watch");
var runSequence = require("run-sequence");
var rm = require("del");
var rename = require("gulp-rename");
var minifycss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var connect = require("gulp-connect");
var babel = require("gulp-babel");

var htmlPath = 'src/html/*.html';
var lessPath = 'src/less/*.less';
var jsPath = 'src/js/*';
var imgPath = 'src/assets/**.*';

var testPort = 8081;


gulp.task("clean", function() {
  return rm("dist", function() {
    console.log("gulp clean ok!");
  });
});

gulp.task("html", function() {
  return gulp.src(htmlPath).pipe(gulp.dest("dist")).pipe(connect.reload());
});

gulp.task("less", function() {
  return (gulp
      .src(lessPath)
      // .pipe(watch('src/less/*.less'))
      .pipe(less())
      .pipe(minifycss({ compatibility: "ie8" }))
      .pipe(
        rename(function(path) {
          path.basename += ".min";
        })
      )
      .pipe(gulp.dest("dist/css")).pipe(connect.reload()));
});

gulp.task("img", function() {
  return gulp.src(imgPath).pipe(gulp.dest("dist/assets")).pipe(connect.reload());
});

gulp.task("js", function() {
  return gulp
    .src(jsPath)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename(function(path){
        path.basename += ".min";
    }))
    .pipe(gulp.dest("dist/js")).pipe(connect.reload());
});

gulp.task("connect",function(){
    connect.server({
        root:'dist',
        livereload: true,
        port: testPort
    });
})

gulp.task("livereload",function(){
    gulp.src("dist/**.*").pipe(watch()).pipe(connect.reload());
})

gulp.task("watch",function(){
    gulp.watch(lessPath,['less']);
    gulp.watch(jsPath,['js']);
    gulp.watch(htmlPath,['html']);
    gulp.watch(imgPath,['img']);
})

gulp.task("beatit", function() {
  runSequence("clean", ["html", "less", "img", "js"],["connect","watch"], function() {
    console.log("BEATIT~ BEATIT~ 2");
  });
  console.log("BEATIT~ BEATIT~ 1");
});
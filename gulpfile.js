const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const babel = require("gulp-babel");

gulp.task('njx', ()=> {
  // Gets .html and .nunjucks files in pages
  return gulp.src('views/pages/**/*.+(html|njx)')
  // // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['views/templates/']
    }))
  // // output files in app folder
  .pipe(gulp.dest('views'))
  // console.log('hi')
});

gulp.task('sass', ()=> {
  return gulp.src('./public/src/sass/**/*.scss)')
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(gulp.dest('public/css'))
});

gulp.task('es6', () => {
  return gulp.src("./routes/src/index.js")
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("routes"));
});


gulp.task('default', ['njx'], ()=>{
  gulp.watch('./public/src/sass/**/*.scss', ['sass'])
  gulp.watch('./views/pages/**/*.+(html|njx)', ['njx'])
  gulp.watch('./routes/src/index.js', ['es6'])
});








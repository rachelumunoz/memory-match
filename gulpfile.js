const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const babel = require("gulp-babel");

gulp.task('nunjucks', ()=> {
  // Gets .html and .nunjucks files in pages
  return gulp.src('./views/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['views/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('views'))
});

gulp.task('sass', ()=> {
  return gulp.src('./public/src/sass/app.scss')
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(gulp.dest('public/css'))
});

gulp.task('es6', () => {
  return gulp.src(["routes/src/index.js", "routes/src/api.js"])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("routes"));
});


gulp.task('default', ['es6'], ()=>{
  gulp.watch('./public/src/sass/app.scss', ['sass'])
  gulp.watch('./views/pages/**/*.+(html|nunjucks)', ['nunjucks'])
  gulp.watch('./routes/src/index.js)', ['es6'])
});
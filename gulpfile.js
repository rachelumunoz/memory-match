const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass')
const autoPrefixer = require('gulp-autoprefixer')

gulp.task('nunjucks', ()=> {
  // Gets .html and .nunjucks files in pages
  return gulp.src('views/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['views/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('views'))
});

gulp.task('sass', ()=> {
  gulp.src('./public/src/sass/app.scss')
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(gulp.dest('public/css'))
});

gulp.task('watch', ()=>{
  gulp.watch('./public/src/sass/app.scss', ['sass'])
  gulp.watch('views/pages/**/*.+(html|nunjucks)', ['nunjucks'])
})

gulp.task('default', ['watch', 'nunjucks']);
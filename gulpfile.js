const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass')
const autoPrefixer = require('gulp-autoprefixer')

gulp.task('nunjucks', ()=> {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/views/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/views/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('app'))
});

gulp.task('sass', ()=> {
  gulp.src('./app/public/src/sass/app.scss')
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./app/public/css/'))
});

gulp.task('watch', ()=>{
  gulp.watch('./app/public/src/sass/app.scss', ['sass'])
  gulp.watch('app/views/pages/**/*.+(html|nunjucks)', ['nunjucks'])
})

gulp.task('default', ['watch', 'nunjucks']);
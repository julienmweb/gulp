var gulp       = require('gulp');
var changed    = require('gulp-changed');
var imagemin   = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS  = require('gulp-minify-css');
var sass       = require('gulp-ruby-sass');
var plumber    = require('gulp-plumber');
var livereload = require('gulp-livereload');
var bower      = require('gulp-bower');


var pathImgSrc               ='./src/images/**/*';
var pathImgDest              ='./build/images';
var pathHtmlSrc              = ['./src/*.php','./src/*.html'];
var pathHtmlDest             = './build';
var pathScripstSrc           = ['./src/scripts/lib.js','./src/scripts/*.js'];
var pathScriptsDest          = './build/scripts/';
var pathCopyFilesSrc         = ['./src/*.pdf', './src/*.ico', './src/*.txt'];
var pathCopyFilesDest        = './build/';
var pathCopyBowerSrc         = ['./src/scripts/bower/**/*'];
var pathCopyBowerDest        = './build/scripts/bower/';
var pathStylesSrc            = ['./src/styles/*.css'];
var pathStylesDest           = './build/styles/';
var pathSassSrc              = './src/styles/scss/';
var pathSassDest             = './src/styles/';
var pathWatchFilesSass       = './src/styles/scss/*.scss';
var pathWatchFilesLivereload = ['src/*.html','src/*.php','src/scripts/*.js','src/styles/*.css'];



// minify new images
gulp.task('imagemin', function() {
  var imgSrc = pathImgSrc,
      imgDst = pathImgDest; 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});
 
// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = pathHtmlSrc;
      htmlDst = pathHtmlDest; 
  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// minify and concat scripts
gulp.task('scripts', function() {
  gulp.src(pathScriptsSrc)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(pathScriptsDest));
});

// Copy
gulp.task('copy', function() {
  gulp.src(pathCopyFilesSrc)
    .pipe(gulp.dest(pathCopyFilesDest));
  gulp.src(pathCopyBowerSrc)
    .pipe(gulp.dest(pathCopyBowerDest));      
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(pathStylesSrc)
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(pathStylesDest));
});

// Sass Compilation
gulp.task('sass', function() {
    return sass(pathSassSrc, {style: 'expanded'})
    .on('error', function (err) {
      console.error('Error', err.message);
   })
    .pipe(gulp.dest(pathSassDest));
});

// task for production
gulp.task('prod',['imagemin', 'htmlpage', 'scripts', 'sass','styles','copy'], function(){
});

gulp.task('default', function(){
});

// task for dev
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(pathWatchFilesSass, ['sass']);
	gulp.watch(pathWatchFilesLivereload).on('change',livereload.changed);
});

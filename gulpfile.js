var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	plumber = require('gulp-plumber'),
	gulpCopy = require('gulp-copy'),
	colors = require('colors');

gulp.task('jade', function () {
	gulp.src('jade/[^_]*.jade')
     .pipe(plumber())
	.pipe(jade())
	.pipe(gulp.dest('./public/'));
	console.log(colors.yellow('<----------jade compile running!---------->'));
});
gulp.task('scss', function () {
	gulp.src('scss/[^_]*.scss')
     .pipe(plumber())
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./public/assets/css'));
    	console.log(colors.yellow('<----------sass compile running!---------->'));
});
gulp.task('copy', function () {
	gulp.src('assets/**/*')
	.pipe(gulpCopy('./public/'));
  console.log(colors.yellow('<----------copy task running!---------->'));
});
gulp.task('clean', function() {
    return gulp.src(['public'], {
        read: false
    })
    .pipe(clean());
    console.log(colors.yellow('<----------clean task  running!---------->'));
});
gulp.task('refresh',function() {
    browserSync({
        files: '**',
        server: {
            baseDir: './public/'
        },
        port: 4001
    });
});
gulp.task('default', ['clean'] , function() {
  runSequence('scss', 'jade','copy');
});
gulp.task('watch', function() {
   gulp.watch('scss/*.scss', ['scss']);
   gulp.watch('jade/*.jade', ['jade']);
   gulp.watch('assets/**/*', ['copy']);
   // gulp.watch('fonts/*.ttf', ['font-convert']);
});

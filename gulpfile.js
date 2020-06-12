var gulp = require('gulp')
var sass = require('gulp-sass')

var minify = require('gulp-minify');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
//var concat = require('gulp-concat');
//var cached = require('gulp-cached');
var debug = require('gulp-debug');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var svgSprite = require('gulp-svg-sprite');
var replace = require('gulp-replace');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var spritesmith = require('gulp.spritesmith');// Спрайт PNG
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

// Создаем таск Sass
gulp.task('sass', function () {
	return gulp.src('assets/scss/style.scss') // Берем источник
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return{
					title: "Error",
					message: err.message
				}
			})
		}))
		.pipe(sass({outputStyle: 'compressed'})) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(debug({title: 'sass:'}))
		.pipe(autoprefixer({
            grid: 'autoplace',
			browsers: ['last 8 versions'],
			cascade: false
		}))
		.on('data', function (file){})
		.pipe(gulp.dest('assets/css/'))
});

gulp.task('components-sass', function () {
	return gulp.src('inc/components/**/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return{
					title: "Error",
					message: err.message
				}
			})
		}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(debug({title: 'sass:'}))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.on('data', function (file){})
		.pipe(gulp.dest(function(file){
			return file.base;
		}))
});

gulp.task('scripts', function() {
	gulp.src('assets/js/**/*.js')
		.pipe(minify({
			ignoreFiles: ['*.min.js', '*-min.js']
		}))
		.pipe(gulp.dest('assets/js/'))
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
	browserSync({// Выполняем browserSync
		notify: false, // Отключаем уведомления
		proxy: "http://clear-check/"
	});
});

gulp.task('watch', ['browser-sync', 'sass', 'components-sass'], function () {
	gulp.watch('assets/scss/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	// gulp.watch('inc/components/**/*.scss', ['components-sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('assets/**/*.*', browserSync.reload);
});

gulp.task('default', ['watch', 'sass']);

let gulp         = require('gulp'),
	sass         = require('gulp-sass')(require('sass')),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify-es').default,
	cleancss     = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rename       = require('gulp-rename'),
	del          = require('del');

// Local server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done(); };

// Custom Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expanded' }))
	.pipe(concat('styles.min.css'))
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// Scripts & JS Libraries
gulp.task('scripts', function() {
	// 'node_modules/jquery/dist/jquery.min.js',
	// 'node_modules/photoswipe/dist/umd/photoswipe.umd.min.js',
	// 'node_modules/photoswipe/dist/umd/photoswipe-lightbox.umd.min.js'
	// 'node_modules/tingle.js/dist/tingle.min.js',
	return gulp.src([
		'app/libs/swiperjs/swiper-bundle.min.js',
		'app/libs/custom-select/itc-custom-select.js',
		'node_modules/photoswipe/dist/umd/photoswipe.umd.min.js',
		'node_modules/photoswipe/dist/umd/photoswipe-lightbox.umd.min.js'
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Minify js
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// Code & Reload
gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
	return gulp.src('app/js/*.js')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));

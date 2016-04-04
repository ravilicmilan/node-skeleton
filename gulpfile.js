var gulp = require('gulp'); 
 
// include plug-ins
var changed = require('gulp-changed');
var minifyHTML = require('gulp-minify-html');

var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
 
// minify new or changed HTML pages
gulp.task('minify-html', function() {
 	var opts = {empty:true, quotes:true};
 	var htmlPath = {
 		htmlSrc: [
 			'./public/js/app/components/**/**/*.html', 
 			'./public/js/app/components/**/*.html', 
 			'./public/js/app/sections/**/**/*.html',
 			'./public/js/app/sections/**/*.html',
 		], 

 		htmlDest: './public/views'
 	};
 
  	return gulp.src(htmlPath.htmlSrc)
    	.pipe(changed(htmlPath.htmlDest))
    	.pipe(minifyHTML(opts))
    	.pipe(gulp.dest(htmlPath.htmlDest));
});

// CSS concat, auto prefix, minify, then rename output file
gulp.task('minify-css', function() {
	var cssPath = {
		cssSrc: [
			 
		], 
		cssDest:'./public/css/'
	};
 
  	return gulp.src(cssPath.cssSrc)
  	  	.pipe(concat('styles.css'))
  	  	.pipe(autoprefix('last 2 versions'))
  	  	.pipe(minifyCSS())
  	  	.pipe(rename({ suffix: '.min' }))
  	  	.pipe(gulp.dest(cssPath.cssDest));
});

// JS concat, strip debugging code and minify
gulp.task('bundle-scripts', function() {
	var jsPath = {
		jsSrc:[
			'./public/js/app/app.js',
			'./public/js/app/*.js',
			'./public/js/app/**/*.js',
			'./public/js/app/**/**/*.js',
			'./public/js/app/**/**/**/*.js',
		], 
		jsDest:'./public/js'
	};

	gulp.src(jsPath.jsSrc)
	    .pipe(concat('ngscripts.js'))
	    .pipe(stripDebug())
	    .pipe(uglify())
	    .pipe(rename({ suffix: '.min' }))
	    .pipe(gulp.dest(jsPath.jsDest));
});

// JS concat, strip debugging code and minify
gulp.task('bundle-vendor-scripts', function() {
	var jsPath = {
		jsSrc:[
			
		], 
		jsDest:'./public/js'
	};

	gulp.src(jsPath.jsSrc)
	    .pipe(concat('vendor.js'))
	    .pipe(stripDebug())
	    .pipe(uglify())
	    .pipe(rename({ suffix: '.min' }))
	    .pipe(gulp.dest(jsPath.jsDest));
});

// // default gulp task
// gulp.task('default', ['minify-html', 'bundle-scripts', 'minify-css'], function() {
// 	// watch for HTML changes
//   	gulp.watch('./app/views/*.html', ['minify-html']);
//   	// watch for JS changes
//   	gulp.watch('./app/**/*.js', ['bundle-scripts']);
//   	// watch for CSS changes
//   	gulp.watch('./content/css/*.css', ['minify-css']);
// });
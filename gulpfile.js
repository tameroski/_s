'use strict';

var gulp = require('gulp'),
	$ = require( "gulp-load-plugins" )();

gulp.task('style_clean', function () {
    require('del').sync([
    	'./style.css'
    ]);
});

gulp.task('style_main', [], function(){
	return gulp.src('sass/style.scss')
		.pipe($.sass({
			includePaths: ["styles"].concat(require('bourbon').includePaths).concat(require('bourbon-neat').includePaths)
		}).on('error', $.sass.logError))
		.pipe($.cleanCss({
			compatibility: 'ie10'
		}))
		.pipe(gulp.dest('./'))
});

gulp.task('style', [ 'style_clean' ], function(){
	gulp.start('style_main');
});

gulp.task('init', [], function(){
	
});

gulp.task('default', [ 'style' ]);
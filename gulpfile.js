'use strict';

var paths = {
	source:{
		scripts: [

		],
		styles: [
			'./sass/**/*.scss',
		]
	},
	dest:{
		scripts: [

		],
		styles: [
			'./style.css',
		]
	}
}

var gulp = require('gulp'),
	$ = require( "gulp-load-plugins" )();

gulp.task('style_clean', function () {
    require('del').sync(paths.dest.styles);
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

gulp.task('watch', [], function(){
	gulp.watch(paths.source.styles, ['default']);
});

gulp.task('default', [ 'style' ]);
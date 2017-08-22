'use strict';

var gulp = require('gulp'),
	$ = require( "gulp-load-plugins" )();

var paths = {
	source:{
		scripts: [

		],
		styles: [
			'./sass/**/*.scss',
		],
		php: [
			'./**/*.php'
		]
	},
	dest:{
		scripts: [

		],
		styles: [
			'./style.css',
		],
		php: [
			'./**/*.php'
		]
	}
}

/* STYLES */
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

/* TASKS */
gulp.task('init', function(){
	var argv = require('yargs').argv;

	if (typeof(argv.name) == 'undefined' || argv.name === ''){
		console.log('Error : name cannot be empty');
  		process.exit(-1)
	}

	gulp.src(paths.source.php, {base: './'})
		.pipe($.replace("'_s'", "'" + slugify(argv.name) + "'" ))
		.pipe($.replace("_s_", slugify(argv.name) + "_"))
		.pipe($.replace("Text Domain: _s", "Text Domain: " + slugify(argv.name) ))
		.pipe($.replace(" _s", " " + slugify(argv.name) ))
		.pipe($.replace("_s-", slugify(argv.name) + "-"))
		.pipe(gulp.dest('./'));

	gulp.src(paths.source.styles, {base: './'})
		.pipe($.replace("Theme Name: _s", "Theme Name: " + argv.name ))
		.pipe($.replace("Text Domain: _s", "Text Domain: " + slugify(argv.name) ))
		.pipe($.replace("_s-", slugify(argv.name) + "-"))
		.pipe(gulp.dest('./'));

});

gulp.task('watch', [], function(){
	gulp.watch(paths.source.styles, ['default']);
});

gulp.task('default', [ 'style' ]);

/* UTILS */
function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function handleError (err) {
  console.log(err.toString())
  process.exit(-1)
}
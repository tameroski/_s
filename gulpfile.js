'use strict';

var slug = "_s";

var gulp = require('gulp'),
	$ = require( "gulp-load-plugins" )();

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
/* Not working very well at the moment. Maybe let's try https://www.npmjs.com/package/gulp-exec */
gulp.task('init', [], function(){
	var argv = require('yargs').argv;

	return gulp.src(paths.source.styles, {read: false}) // gulp.src('') is an anti pattern
		.pipe($.run("find . -type f -name '*.php' -print0 | xargs -0 sed -i '' \"s#'_s'#'" + slugify(argv.name || slug) + "'#g\"").exec())
		.pipe($.run("find . -type f -name '*.php' -print0 | xargs -0 sed -i '' 's/_s_/" + slugify(argv.name || slug) + "_/g'").exec())
		.pipe($.run("find . -type f -name '*.scss' -print0 | xargs -0 sed -i '' 's/Text Domain: _s/Text Domain: " + slugify(argv.name || slug) + "/g'").exec())
		.pipe($.run("find . -type f -name '*.php' -print0 | xargs -0 sed -i '' 's/ _s/ " + slugify(argv.name || slug) + "/g'").exec())
		.pipe($.run("find . -type f -name '*.php' -print0 | xargs -0 sed -i '' 's/_s-/" + slugify(argv.name || slug) + "-/g'").exec())
		.pipe($.run("find . -type f -name '*.scss' -print0 | xargs -0 sed -i '' 's/_s-/" + slugify(argv.name || slug) + "-/g'").exec())
    	.on('error', handleError)
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
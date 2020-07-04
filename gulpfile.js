
	'use strict';

	const 	gulp 	= require('gulp'),
			uglify 	= require('gulp-uglify-es').default,
			rigger 	= require('gulp-rigger'),
			rimraf 	= require('rimraf'),
			gulpif	= require('gulp-if'),
			args 	= require('yargs').argv,

			env 	= (args.env === 'prod') ? 'prod' : 'dev',	// -env=prod -env=dev

			isDev	= env === 'dev',
			isProd	= env === 'prod';

	 console.warn('ENV:',env );

	const path = {
		build: 	{ js: 'build/', },
		src: 	{ js: 'src/main.js', },
		clean: 	'./build/'
	};

	gulp.task('js', function () {
		return gulp.src(path.src.js)       		// Найдем наш main файл
		.pipe(rigger())                   		// Прогоним через rigger
		.pipe(uglify({ecma: 10}))	// Сожмем наш js
		.pipe(gulp.dest(path.build.js))   		// Выплюнем готовый файл в build
	});
	gulp.task('clean', function (cb) {
		return rimraf(path.clean, cb);
	});
	gulp.task('build', gulp.series('clean','js'));
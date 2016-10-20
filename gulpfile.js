/*
* Dependencias
*/
var gulp = require('gulp'),
 nodemon = require('gulp-nodemon');

gulp.task('start', function() {
	console.log("Arrancamos el server");
	nodemon({
		script: 'server.js',
		watch: ['*.js']
	});
});
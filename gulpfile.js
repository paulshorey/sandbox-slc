// Include gulp
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var beautify = require('gulp-jsbeautifier');
var spawn = require('child_process').spawn;
var node;


// TASK :: LINT
gulp.task('jsLint', function() {
    return gulp.src(['*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('jsBeautify', function() {
    gulp.src(['*.js'])
        .pipe(beautify({
            js: {
                indentSize: 1,
                indentWithTabs: true,
                jslintHappy: false
            }
        }))
        .pipe(gulp.dest('.'));
});
gulp.task('lint', function() {
    gulp.watch(['*.js'], ['jsLint', 'jsBeautify']);
});


// TASK :: SERVE
gulp.task('app', function() {
    if (node) node.kill()
    node = spawn('node', ['app.js'], {
        stdio: 'inherit'
    })
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});
gulp.task('api', function() {
    if (node) node.kill()
    node = spawn('node', ['api.js'], {
        stdio: 'inherit'
    })
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});


// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})
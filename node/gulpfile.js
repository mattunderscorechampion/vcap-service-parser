
'use strict';

var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    TerminalReporter = require('jasmine-terminal-reporter'),
    reporters = require('jasmine-reporters');

gulp.task('unit-test', function(done) {
    var reporter = new reporters.JUnitXmlReporter({
        savePath : "./target/jasmine",
        filePrefix : "JUnit-",
        consolidateAll : false
    });

    var terminalReporter = new TerminalReporter();

    return gulp.src(['src/test/**/*.js'])
        .pipe(jasmine({
            reporter : [reporter, terminalReporter],
            requireStackTrace : true,
            includeStackTrace : true
        }));
});

gulp.task('default', ['unit-test']);

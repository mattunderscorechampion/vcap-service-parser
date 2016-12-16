
'use strict';

var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    TerminalReporter = require('jasmine-terminal-reporter'),
    reporters = require('jasmine-reporters'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var lintOptions = {
    curly : true,
    undef : true,
    unused : false,
    strict : true,
    eqeqeq : true,
    maxlen : 120,
    maxdepth : 5,
    indent : 4,
    noempty : true,
    nonew : true,
    maxcomplexity : 12,
    node : true,
    esversion: 5
};

gulp.task('unit-test', function() {
    var reporter = new reporters.JUnitXmlReporter({
        savePath : "target/jasmine",
        filePrefix : "JUnit-",
        consolidateAll : false
    });

    var terminalReporter = new TerminalReporter();

    return gulp.src(['src/test/**/*.js'])
        .pipe(jasmine({
            reporter : [reporter, terminalReporter]
        }));
});

gulp.task('lint', function () {
    return gulp.src(['src/main/*.js'])
        .pipe(jshint(lintOptions))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['unit-test', 'lint']);

// @flow
const gulp = require('gulp');
const webpack = require('gulp-webpack');

gulp.task('default', ['build']);
gulp.task('build', () => {
    return gulp.src('src/ThreadedFunction.js')
        .pipe(webpack({
            output: {
                filename: 'ThreadedFunction.js',
                library: 'threaded-function',
                libraryTarget: 'umd',
            },
            module: {
                loaders: [
                    { test: /\.js/, loader: 'babel-loader' },
                ],
            },
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build:demo', () => {
    return gulp.src('demo/demo.js')
        .pipe(webpack({
            output: {
                filename: 'compiled.js',
            },
            module: {
                loaders: [
                    { test: /\.js/, loader: 'babel-loader' },
                ],
            },
        }))
        .pipe(gulp.dest('demo/'));
});

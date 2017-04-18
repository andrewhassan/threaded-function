// @flow
const gulp = require('gulp');
const webpack = require('gulp-webpack');

gulp.task('default', ['clean', 'build']);

gulp.task('build', () => {
    return gulp.src('src/index.js')
        .pipe(webpack({
            output: {
                filename: 'main.js',
            },
            module: {
                loaders: [
                    { test: /\.js/, loader: 'babel-loader' },
                ],
            },
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', () => {
    console.warn('Task: clean not implemented');
});

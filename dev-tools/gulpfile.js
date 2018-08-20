'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-clean-css'),
    del = require('del'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

//Пути
var path = {
    build: { // Готовые после сборки файлы
        html: '../build/',
        js: '../build/js/',
        css: '../build/css/',
        fonts: '../build/fonts/',
        img: '../build/img/'
    },
    src: { // Исходники
        html: '../src/*.html',
        js: '../src/js/main.js',
        style: '../src/style/main.less',
        fonts: '../src/fonts/**/*.*',
        img: '../src/img/**/*.*'
    },
    watch: { // Наблюдение за изменениями
        html: '../src/**/*.html',
        js: '../src/js/**/*.js',
        style: '../src/style/**/*.less',
        fonts: '../src/fonts/**/*.*',
        img: '../src/img/**/*.*'
    },
    clean: '../build'
};

// Сервер
var config = {
server: {
    baseDir: "../build"
},
tunnel: true,
host: 'localhost',
port: 9000,
logPrefix: "Frontend_Devil"
};

// Сборка Html
gulp.task('html', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// Сборка Js
gulp.task('js', function() {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

// Сборка стилей
gulp.task('style', function() {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// Сборка шрифтов
gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Сборка изображений
gulp.task('img', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
});

// Очистка папки build
gulp.task('clean', function() {
    return del('build');
});

// Сборка
gulp.task('build', [
    'clean',
    'html',
    'js',
    'style',
    'fonts',
    'img'
]);

// Изменение файлов
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});

// Веб-сервер
gulp.task('webserver', function() {
    browserSync(config);
});

// Запуск сборки
gulp.task('default', ['build', 'webserver', 'watch']);

/**
 * Created by supersoup on 16/7/29.
 */
var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rjs = require('gulp-requirejs');

//开发环境模板:编译jade,(也可以使用html文件不进行编译),存放在dest目录下
gulp.task('template-dev', function () {
    gulp.src('avlPublic/src/template/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('avlPublic/dest/template'));

    gulp.src('avlPublic/src/template/**/*.html')
        .pipe(gulp.dest('avlPublic/dest/template'));
});

//开发环境样式:编译sass, 自动添加前缀,存放在dest目录下
gulp.task('stylesheet-dev', function () {
    gulp.src('avlPublic/src/stylesheet/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('avlPublic/dest/stylesheet'));
});

//开发环境脚本:把js复制存放在dest目录下
gulp.task('script-dev', function () {
    gulp.src('avlPublic/src/script/**')
        .pipe(gulp.dest('avlPublic/dest/script'));
});

//生产环境脚本: 打包js
gulp.task('script-pro', function () {
    rjs({
        baseUrl: 'avlPublic/src/script/', //找到main.js文件的目录
        paths: {
            avalon: "./avalon.oniui/avalon.shim",
            text: "./avalon.oniui/combo/text", //由于分居两个目录，因此路径都需要处理一下
            css: "./avalon.oniui/combo/css",
            "css-builder": "./avalon.oniui/combo/css-builder",
            "normalize": "./avalon.oniui/combo/normalize",
            domReady: "./avalon.oniui/combo/domReady",

            jquery: "other_lib/jquery"
        },

        //optimize: "none",//如果要调试就不压缩
        name: "core/main", //如果从哪一个文件开始合并
        out: "main.js" //确定要生成的文件路径及名字
    })
        .pipe(gulp.dest('avlPublic/dest/script/core'));
});

//开发环境任务集成: 监听src的不同文件并作出相应的操作, 在dest生成用于调试代码
gulp.task('development', ['template-dev', 'stylesheet-dev', 'script-dev'], function () {
    gulp.watch('avlPublic/src/template/**', ['template-dev']);
    gulp.watch('avlPublic/src/stylesheet/**', ['stylesheet-dev']);
    gulp.watch('avlPublic/src/script/**', ['script-dev']);
});

//生产环境任务集成: 一键清空dest, 并生成用于发布的代码
gulp.task('product', ['script-pro']);

//默认项目为开发环境监听
gulp.task('default', ['development']);

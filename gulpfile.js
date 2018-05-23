var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var htmlImport = require('gulp-html-import');
var browserSync = require('browser-sync').create();

var input = './src/stylesheets/**/*.scss';
var output = './dist/css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

//browserSync
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

//Import htmlImport
gulp.task('importhtml', () => {
    gulp.src('./src/*.html')
        .pipe(htmlImport('./src/html/'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
})

//SASS compile
gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});

//SASS watch
gulp.task('watch', function() {
  //return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    gulp.watch(input, ['sass'])
    gulp.watch('src/**/*.html', ['importhtml'])
    // When there is a change,
    // log a message in the console
    .on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync','importhtml','sass', 'watch' /*, possible other tasks... */]);

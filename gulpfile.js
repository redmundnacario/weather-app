// const { task } = require('gulp');
const gulp = require("gulp");//task runner
const sass = require("gulp-sass");//convert sass to css
const sourcemaps = require("gulp-sourcemaps");//map scss dev in css prod
const browserSync = require("browser-sync").create();//live local server
const cssnano = require("gulp-cssnano");//minifying css files
const terser = require("gulp-terser");// minify js files
const rename = require("gulp-rename");//renaming files (min.js or min.css)
const concat = require("gulp-concat");//combining js files into 1
const stripImportExport = require('gulp-strip-import-export');// strip import and export
const imagemin = require("gulp-imagemin");// minifying images
const cache = require("gulp-cache");//caching minified images
const kit = require("gulp-kit"); //combining partials in html
const htmlmin = require("gulp-htmlmin");//minify html
const autoprefixer = require("gulp-autoprefixer");//css compatibility with diff. browsers
const zip = require("gulp-zip");//zipping whole project
const del = require("del");//delete dist files
const plumber = require("gulp-plumber");// for debugging
const notifier = require("gulp-notifier");//notifies when tasks were done successfully
const filelist = require('gulp-filelist')
const order = require('gulp-order')
const babel = require("gulp-babel");//convert all js to ES5 for compatibility with diff. browsers


notifier.defaults({
  messages: {
    sass: "CSS was successfully compiled!",
    js: "Javascript is ready!",
    kit: "HTML was delivered!",
  },
//   prefix: "=====",
//   suffix: "=====",
//   exclusions: ".map"
});

filesPath = {
    kit: "./src/assets/html/**/*.kit",
    html: "./src/index.html",
    sass: "./src/assets/sass/**/*.scss",
    image: "./src/assets/img/**/*.+(png|jpg|svg)",
    js: "./src/assets/js/**/*.js",
    json : "./src/assets/js/sample_data/**/*.json"
    // gif: "./src/assets/img/**/*.gif",
    // font: "./src/assets/fonts/**/*",
    // audio: "./src/assets/audios/**/*"
    // html: "./html/**/*.kit",
}

filesDestpath = {
    kit: "./src",
    html : "./dist",
    sass : "./dist/assets/css",
    image: "./dist/assets/img",
    js : "./dist/assets/js",
    json : "./dist/assets/js/sample_data"
    // gif: "./dist/assets/img",
    // font: "./dist/assets/fonts",
    // audio: "./dist/assets/audios"
}


// HTML
gulp.task("kit", function(done) {
    return (
      gulp.src(filesPath.kit)
        .pipe(plumber({errorHandler: notifier.error}))//enables whole tasks to run even with error
        .pipe(kit())// combine partials into index.html
        .pipe(gulp.dest(filesDestpath.kit))//save to destination file
        .pipe(notifier.success("kit"))//
    )
    done();
})
gulp.task("html", function(done){
    return(
        gulp.src(filesPath.html)
        .pipe(plumber())
        .pipe(htmlmin({
            minifyCSS: true, // inline css,
            minifyJS: true, // inline js, not working
            removeComments: true,
            // removeAttributeQuotes: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(filesDestpath.html))
    )
    done()
})

// Sass

gulp.task("sass", function(done) {
    return (
        gulp
            .src([filesPath.sass])
            // .src(["./src/sass/**/*.scss", "!./src/sass/widget.scss"])
            // *.scss - all files at the end of the path
            //  **/*.scss - match all files at the end of the path plus all children files and folders
            // !*.scss or !**/*.scss - exclude the matching expressions
            .pipe(plumber({errorHandler: notifier.error}))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cssnano()) // minify css
            .pipe(sourcemaps.write("."))
            .pipe(
                rename(function(path) {
                    if (!path.extname.endsWith(".map")) {
                        path.basename += ".min";
                    }
                })
            )
            .pipe(gulp.dest(filesDestpath.sass))
            .pipe(notifier.success("sass"))
    );
    done();
});


gulp.task("javascript", function(done) {
    return (
        gulp.src(filesPath.js)
        .pipe(plumber({errorHandler: notifier.error}))
        .pipe(sourcemaps.init())
        .pipe(stripImportExport())
        .pipe(order(
            [   
                "src/assets/js/polyfill.min.js",
                "src/assets/js/classes/event.js",
                "src/assets/js/classes/api/*.js",
                "src/assets/js/classes/firebase/*.js",
                "src/assets/js/classes/model/*.js",
                "src/assets/js/classes/view/*.js",
                "src/assets/js/classes/controller/*.js",
                "src/assets/js/_*.js",
                "src/assets/js/index.js",
            ],
            { base: './' }
        ))
        .pipe(concat("index.min.js"))
        .pipe(
            babel({
                presets: [
                    '@babel/preset-env',
                ]
            })
        )
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(filesDestpath.js))
        .pipe(notifier.success("js"))
    );
    done();
});

gulp.task("listJSfiles", function(done) {
    return (
        gulp.src(filesPath.js)
        .pipe(filelist('filelist.json'))
        .pipe(gulp.dest("."))
    )
    done();
});

// Copy json files

gulp.task ("json", function(done){
    return (
        gulp.src(filesPath.json)
        .pipe(plumber())
        .pipe(gulp.dest(filesDestpath.json))
    )
    done()
})

// Images optimization

gulp.task("imagemin", function(done) {
    return (
      gulp.src(filesPath.image)
      .pipe(cache(imagemin()))
      .pipe(gulp.dest(filesDestpath.image))
    )
    done();
});

// Copyt the iamge gifs , audio files and fonts ) 

gulp.task("copyGifs", function(done){
    return(
        gulp.src(filesPath.gif)
        .pipe(plumber())
        .pipe(gulp.dest(filesDestpath.gif))
    )
})

gulp.task("copyFonts", function(done){
    return(
        gulp.src(filesPath.font)
        .pipe(plumber())
        .pipe(gulp.dest(filesDestpath.font))
    )
})

gulp.task("copyAudios", function(done){
    return(
        gulp.src(filesPath.audio)
        .pipe(plumber())
        .pipe(gulp.dest(filesDestpath.audio))
    )
})

gulp.task("config", function(done){
    return(
        gulp.src('./src/config.js')
        .pipe(plumber())
        .pipe(gulp.dest('./dist'))
    )
})



//  HTML kit templating

/*
gulp.task("kit", function(done) {
    return (
      gulp.src(filesPath.html)
        .pipe(plumber({errorHandler: notifier.error}))//enables whole tasks to run even with error
        .pipe(kit())// combine partials into index.html
        .pipe(htmlmin({
          collapseWhitespace: true
        }))// minify index.html file
        .pipe(gulp.dest(filesDestpath.html))//save to destination file
        // .pipe(notifier.success("kit"))//
    )
    done();
})
*/


// Copy the FONTS folder/contents
// const fonts = () =>
//     gulp
//         .src(paths.fonts.src)
//         .pipe(plumber())
//         .pipe(gulp.dest(paths.fonts.dest));



// // Copy the VIDEOS folder/contents
// const videos = () =>
//     gulp
//         .src(paths.videos.src)
//         .pipe(plumber())
//         .pipe(gulp.dest(paths.videos.dest));


// Watch task with BrowserSync

gulp.task("watch", function() {
    browserSync.init({
        server: {
        baseDir: "./dist/"
        },
        browser: "google chrome"
    });

    gulp
        .watch(
            [
                filesPath.kit,
                filesPath.sass,
                filesPath.image,
                filesPath.js,
                './src/config.js',
                filesPath.json,
                // filesPath.gif,
                // filesPath.audio,
                // filesPath.font,
            ], 
            gulp.parallel([ 
                            gulp.series(["kit", "html"]),
                            "sass",
                            "imagemin",
                            gulp.series(["javascript", "listJSfiles"]),
                            "config",
                            "json"
                            // "copyGifs",
                            // "copyAudios",
                            // "copyFonts"
                            //  "kit"
                            ])
        )
        .on("change", browserSync.reload);
});

// Clear cache

gulp.task("clear-cache", function(done) {
    return cache.clearAll(done);
  });
  

// Serve

gulp.task("serve", gulp.parallel([
    gulp.series(["kit", "html"]),
    "sass",
    "imagemin",
    gulp.series(["javascript", "listJSfiles"]), 
    "config",
    "json"
    // "copyGifs",
    // "copyAudios",
    // "copyFonts"
]));


// Gulp default command
  
gulp.task("default", gulp.series(["serve", "watch"]));
  


// Zip project
// Zipped all recursively except the node modules

gulp.task("zip", function(done) {
    return(
      gulp.src(["./**/*", "!./node_modules/**/*"])
      .pipe(zip("project.zip"))
      .pipe(gulp.dest("./"))
    )
    done();
  })



// Clean "dist" folder

gulp.task("clean-dist", function(done) {
    return del(["./dist/**/*"]);
      done();
});
  
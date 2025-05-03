const gulp = require("gulp");
const rev = require("gulp-rev").default;
const revReplace = require("gulp-rev-replace");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const { deleteAsync } = require("del");
const gulpIf = require("gulp-if");
const fs = require("fs");

const paths = {
  html: "src/**/*.html",
  css: "src/assets/css/**/*.css",
  js: "src/assets/js/**/*.js",
  images: "src/assets/img/**/*.{jpg,jpeg,png,svg,webp}",
  fonts: "src/assets/fonts/**/*",
  dist: "dist/",
};

// Clean dist
gulp.task("clean", () => deleteAsync([paths.dist]));

// Process assets and generate manifest
gulp.task("rev-assets", () => {
  return gulp
    .src(
      [
        paths.css,
        paths.js,
        "src/assets/**/*.{png,jpg,jpeg,gif,svg,webp}", // Include images for revision
      ],
      { base: "src" }
    )
    .pipe(gulpIf(/\.css$/, cleanCSS()))
    .pipe(gulpIf(/\.js$/, uglify()))
    .pipe(rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest("rev-manifest.json"))
    .pipe(gulp.dest(paths.dist));
});

// Optimize images
gulp.task("optimize-images", () => {
  return gulp
    .src("src/assets/img/**/*.{jpg,jpeg,png,svg,webp}")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img"));
});

// Process HTML files with proper manifest handling
gulp.task("html", () => {
  // Verify manifest exists
  if (!fs.existsSync(`${paths.dist}/rev-manifest.json`)) {
    throw new Error("rev-manifest.json not found! Run rev-assets first.");
  }

  return gulp
    .src(paths.html, { base: "src" })
    .pipe(
      revReplace({
        manifest: gulp.src(`${paths.dist}/rev-manifest.json`),
        replaceInExtensions: [".html"],
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      })
    )
    .pipe(gulp.dest(paths.dist));
});

// Copy other assets (images, fonts, etc.)
gulp.task("copy-assets", () => {
  return gulp
    .src(
      [
        "src/assets/**/*",
        "!src/assets/{css,js,img}/**/*", // Exclude CSS, JS, and image folders
      ],
      { base: "src" }
    )
    .pipe(gulp.dest(paths.dist));
});

// Watch for changes during development
gulp.task("watch", () => {
  gulp.watch(paths.html, gulp.series("html"));
  gulp.watch([paths.css, paths.js], gulp.series("rev-assets", "html"));
});

// Default production build
gulp.task("default", gulp.series("clean", "rev-assets", "html", "copy-assets"));

// Dev task with watching
gulp.task("dev", gulp.series("default", "watch"));

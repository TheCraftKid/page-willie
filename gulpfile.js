const gulp = require('gulp');
const mergeStream = require('merge-stream');
const minify = require('uglify-js');

const client = require('firebase-tools');
const builder = require('polymer-build');
const PolymerProject = require('polymer-build').PolymerProject;

const PROJECT_PATH = '.';
const FIRBASE_PROJECT = require('./.firebaserc').project.default;

const project = new PolymerProject(require('./polymer.json'));

gulp.task('default', () => {
  console.log('Hello, world!');
});

gulp.task('build', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(minify())
    .pipe(gulp.dest('build'));
});

gulp.task('build:functions', () => {
  gulp.src(['functions']);
});

gulp.task('watch', () => {
  const watcher = gulp.watch('*.js', ['build']);
  watcher.on('change', (event) => {
    console.log(`File at ${event.path} was modified, rebuilding...`);
  });
});

gulp.task('deploy', ['deploy:functions', 'deploy:site']);

gulp.task('deploy:functions', () => {

});

gulp.task('deploy:site', () => {
  client.deploy({
    project: FIRBASE_PROJECT,
    token: process.event.FIREBASE_TOKEN,
    cwd: PROJECT_PATH,
  }).then(() => {

  }).catch((err) => {
    console.error('Error when deploying site:', err);
  });
});

gulp.task('generatePushManifest', () => {
  mergeStream(project.sources(), project.dependencies())
    .pipe(project.addPushManifest())
    .pipe(gulp.dest('build/'));
});

/**
 * Inserts the Firebase script tags to load using Firebase Hosting's CDN.
 */
function injectFirebase() {
  const latestFireabseVersion = '4.6.2';
  const url = `/__/firebase/${latestFirebaseVersion}/firebase-app.js`;
  // return function
}

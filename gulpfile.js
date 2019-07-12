var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var del = require('del');
var through = require('through2');
var open = require('open');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var gulputil = require('gulp-util');
var gulpCleanCss = require('gulp-clean-css');
var gulpLess = require('gulp-less');
var getText = require('gulp-angular-gettext');
var templateCache = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var casperJs = require('gulp-casperjs');
var rsync = require('rsyncwrapper');
var replace = require("gulp-replace");
var rename = require('gulp-rename');
var jsonModify = require('gulp-json-modify');
var fs = require('fs');

var dist = 'dist';
var html = ['sources/index.html'];
var directivetemplates = ['sources/directives/**/*.html'];
var componenttemplates = ['sources/composants/**/*.html'];
var imagesThemes = ['sources/themes/**/*.svg', 'sources/themes/**/*.png', 'sources/themes/**/*.gif', 'sources/themes/**/*.jpg', 'sources/themes/**/*.ico'];
var externalScripts = ['sources/scripts/bootstrap-material-design.min.js'];
var fonts = ['sources/bower_components/bootstrap/dist/fonts/*', 'sources/bower_components/font-awesome/fonts/*'];
var core = ['sources/serveur/**/*'];
var style = ['sources/themes/'];
var jssources = ['sources/*.js', 'sources/composants/**/*.js', 'sources/directives/**/*.js', 'sources/services/*.js'];

var log = function(message) {
	return through.obj(function(file, encoding, callback) {
		console.log(message, file.path);
		callback(null, file);
	});
};

// Delete the dist directory
gulp.task('clean', function() {
	return del(dist);
});

gulp.task('lint', function() {
  return gulp.src(jssources)
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-jenkins-reporter', {
      filename: __dirname + '/jshint-checkstyle.xml',
      level: 'ewi', 
      base:'src/'
    }));
});

gulp.task('css', function () {
   return gulp.src(style + 'defaut/style.less')
    .pipe($.less())
    .pipe($.csscomb())
    .pipe($.cssbeautify({indent: '  '}))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(style + 'defaut/'))
	.pipe(gulp.dest(dist + "/themes"));
});

gulp.task('directivetemplates', function() {
	return gulp.src(directivetemplates)
		.pipe(gulp.dest(dist + "/directives"));
});

gulp.task('componenttemplates', function() {
	return gulp.src(componenttemplates)
		.pipe(gulp.dest(dist + "/composants"));
});

gulp.task('imagesThemes', function() {
	return gulp.src(imagesThemes)
		.pipe(gulp.dest(dist + "/themes"));
});

gulp.task('externalScripts', function() {
	return gulp.src(externalScripts)
		.pipe(gulp.dest(dist + "/scripts"));
});

gulp.task('fonts', function() {
	return gulp.src(fonts)
		.pipe(gulp.dest(dist + "/fonts"));
});

gulp.task('dataDevelopment', function() {
	gulp.src('sources/versions.json')
		.pipe(gulp.dest(dist));

	return gulp.src('sources/parametres-developpement.json')
		.pipe(rename('parametres.json'))
		.pipe(gulp.dest(dist));
});

gulp.task('dataIntegration', function() {
	gulp.src('sources/versions.json')
		.pipe(gulp.dest(dist));
		
	return gulp.src('sources/parametres-integration.json')
		.pipe(rename('parametres.json'))
		.pipe(gulp.dest(dist));
});

gulp.task('dataProduction', function() {
	gulp.src('sources/versions.json')
		.pipe(gulp.dest(dist));
		
	return gulp.src('sources/parametres-production.json')
		.pipe(rename('parametres.json'))
		.pipe(gulp.dest(dist));
});

gulp.task('updateVersion', function() {
	var devjson = JSON.parse(fs.readFileSync('sources/parametres-developpement.json'));
	var devbuild = devjson.version.split('.')[devjson.version.split('.').length - 1];
	var devmajorbuild = devjson.version.split('.')[0];
	var devmediumbuild = devjson.version.split('.')[1];
	var devnewbuild = parseInt(devbuild) + 1;
	
	var intjson = JSON.parse(fs.readFileSync('sources/parametres-integration.json'));
	var intbuild = intjson.version.split('.')[intjson.version.split('.').length - 1];
	var intmajorbuild = intjson.version.split('.')[0];
	var intmediumbuild = intjson.version.split('.')[1];
	var intnewbuild = parseInt(intbuild) + 1;
	
	var prodjson = JSON.parse(fs.readFileSync('sources/parametres-production.json'));
	var prodbuild = prodjson.version.split('.')[prodjson.version.split('.').length - 1];
	var prodmajorbuild = prodjson.version.split('.')[0];
	var prodmediumbuild = prodjson.version.split('.')[1];
	var prodnewbuild = parseInt(prodbuild) + 1;
	
	var currentdate = new Date();
	
	gulp.src([ 'sources/parametres.json'])
    .pipe(jsonModify({
      key: 'version',
      value: devmajorbuild + '.' + devmediumbuild + '.' + devnewbuild
    }))
	.pipe(jsonModify({
      key: 'lastupdate',
      value: currentdate.getDate() + '/' + (parseInt(currentdate.getMonth()) + 1) + '/' + currentdate.getFullYear()
    }))
    .pipe(gulp.dest('sources'));
	
	gulp.src([ 'sources/parametres-developpement.json'])
    .pipe(jsonModify({
      key: 'version',
      value: devmajorbuild + '.' + devmediumbuild + '.' + devnewbuild
    }))
	.pipe(jsonModify({
      key: 'lastupdate',
      value: currentdate.getDate() + '/' + (parseInt(currentdate.getMonth()) + 1) + '/' + currentdate.getFullYear()
    }))
    .pipe(gulp.dest('sources'));
	
	gulp.src([ 'sources/parametres-integration.json'])
    .pipe(jsonModify({
      key: 'version',
      value: intmajorbuild + '.' + intmediumbuild + '.' + intnewbuild
    }))
	.pipe(jsonModify({
      key: 'lastupdate',
      value: currentdate.getDate() + '/' + (parseInt(currentdate.getMonth()) + 1) + '/' + currentdate.getFullYear()
    }))
    .pipe(gulp.dest('sources'));
	
	return gulp.src([ 'sources/parametres-production.json'])
    .pipe(jsonModify({
      key: 'version',
      value:  prodmajorbuild + '.' + prodmediumbuild + '.' + prodnewbuild
    }))
	.pipe(jsonModify({
      key: 'lastupdate',
      value: currentdate.getDate() + '/' + (parseInt(currentdate.getMonth()) + 1) + '/' + currentdate.getFullYear()
    }))
    .pipe(gulp.dest('sources'));
});

gulp.task('tagVersion', function() {
	var json = JSON.parse(fs.readFileSync('dist/parametres.json'));
	var version = json.version;
	return gulp.src(dist + '/**')
		.pipe(gulp.dest('../tags/' + version));
});

gulp.task('core', function() {
	return gulp.src(['sources/serveur/**/*', '!sources/serveur/composer.json', '!sources/serveur/Documents/**', '!sources/serveur/datastorage/Logs/**', '!sources/serveur/composer.lock', '!sources/serveur/composer.phar', '!sources/serveur/serveur.exceptions.generator.php', '!sources/serveur/proxy.generator.php', '!sources/core/test.proxy.php', '!sources/core/tests.generator.php', '!sources/core/VerifsiretApi.php'])
		.pipe(gulp.dest(dist + '/core/'));
});

gulp.task('minifyAndMerge', ['translations'], function() {
	return gulp.src(html)
	    .pipe(useref())
		.pipe(gulpif('*.js', uglify().on('error', function(e){
            console.log(e)
         })))
		.pipe(gulpif('*.css', gulpCleanCss()))		
		.pipe(log('Generate : '))
		.pipe(gulp.dest(dist))
});

gulp.task('Merge', function() {
	return gulp.src(html)
	    .pipe(useref())
		.pipe(log('Generate : '))
		.pipe(gulp.dest(dist))
});

gulp.task('pot', function () {
    return gulp.src(['src/index.html', 'src/app.js', 'src/composants/*.html', 'src/composants/*.js', 'src/composants/**/*.html', 'src/composants/**/*.js', 'src/directives/*/*.html', 'src/directives/*/*.js', 'src/services/*.js'], {base: '.'})
        .pipe(getText.extract('template.pot', {
            // options to pass to angular-gettext-tools... 
        }))
        .pipe(gulp.dest('src/languages/po/'));
});
 
gulp.task('translations', function () {
	return gulp.src('src/languages/po/*.po')
		.pipe(replace(/Language: (\w\w)_(\w\w)/, 'Language: $1-$2'))
		.pipe(getText.compile({
		    // options to pass to angular-gettext-tools... 
		    format: 'javascript'
        }))
		.pipe(concat('translations.js'))
		.pipe(gulp.dest('src/languages/'));
});

gulp.task('casperJs', function () {
  gulp.src(['tests/ui-tests/USER_AUTH_0020.js'])
    .pipe(casperJs()); 
});
/*endregion Unit Tests */

gulp.task('buildDevelopment', function() {
	console.log('building development build');
	runSequence('clean', 'lint', 'updateVersion', 'dataDevelopment', 'css', 'core', 'imagesThemes', 'fonts', 'minifyAndMerge', 'directivetemplates', 'componenttemplates', 'externalScripts');
});

gulp.task('buildIntegration', function() {
	console.log('building integration build');
	runSequence('clean', 'lint', 'updateVersion', 'dataIntegration', 'css', 'core', 'imagesThemes', 'fonts', 'minifyAndMerge', 'directivetemplates', 'componenttemplates', 'externalScripts');
});

gulp.task('buildProduction', function() {
	console.log('building production build');
	runSequence('clean', 'lint', 'updateVersion', 'dataProduction', 'css', 'core', 'imagesThemes', 'fonts', 'minifyAndMerge', 'directivetemplates', 'componenttemplates', 'externalScripts');
});



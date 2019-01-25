import gulp from 'gulp';
import browserSync from 'browser-sync';
import pug from 'gulp-pug';
import inlineCss from 'gulp-inline-css';
import htmlbeautify from 'gulp-html-beautify';

const server = browserSync.create();

const reload = () => {
	server.reload();
	console.log(`Перезагрузка`);
};

const serve = () => {
	server.init({
		server: {
			baseDir: `build/`
		}
	});

	gulp.watch(`src/**/*.*`).on(`change`, watch);
};

const watch = () => {
	gulp.watch(`src/**/*.*`, gulp.series(html, reload));
};

export const html = () => {
	return gulp.src(`src/pug/index.pug`)
		.pipe(pug())
		.pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: true,
      removeLinkTags: true,
      preserveMediaQueries: true,
      applyTableAttributes: true
    }))
		.pipe(htmlbeautify({
			"indent_size": 4,
			"indent_char": ` `,
			"unformatted": []
		}))
		.pipe(gulp.dest(`build/`));
};


const dev = gulp.parallel(html, serve);

export default dev;

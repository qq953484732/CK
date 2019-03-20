var gulp = require("gulp");
gulp.task("copy-file", async () => {
	gulp.src("*.html").pipe(gulp.dest("C:\\dev\\soft\\phpStudy\\WWW\\CK"));
})
gulp.task("watch-all", async () => {
	gulp.watch(["**/*", "!gulpfile.js", "!package.json", "!node_modules","!scss","!scss/*.scss"], async () => {
		gulp.src(["**/*", "!gulpfile.js", "!package.json", "!node_modules","!scss"],"*.scss").pipe(gulp.dest("C:\\dev\\soft\\phpStudy\\WWW\\CK"));
	});

});
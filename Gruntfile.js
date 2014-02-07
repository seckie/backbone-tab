module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			options: {
				httpPath: '/',
				sassDir: '_scss',
				cssDir: 'css',
				imagesDir: 'img',
				relativeAssets: true
			},
			dev: {
				options: {
					environment: 'development',
					outputStyle: 'expanded',
					noLineComments: true
				}
			},
			pro: {
				options: {
					environment: 'production',
					outputStyle: 'compact',
					noLineComments: true
				}
			}
		},
		copy: {
			libs: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'bower_components/bootstrap/dist/css/bootstrap.min.css',
							'bower_components/jquery/jquery.min.js',
							'bower_components/underscore/underscore-min.js',
							'bower_components/backbone/backbone-min.js'
						],
						dest: 'libs/',
						filter: 'isFile'
					}
				]
			}
		},
		uglify: {
			options: {
				preserveComments: 'all'
			},
			main: {
				src: 'backbone-tab.js',
				dest: 'backbone-tab.min.js'
			}
		},
		watch: {
			scss: {
				files: [ '_scss/*.scss' ],
				tasks: [ 'compass:dev' ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask('default', [ 'compass:dev', 'uglify', 'watch' ]);
	grunt.registerTask('deploy', [ 'copy:libs', 'compass:pro', 'uglify' ]);
};

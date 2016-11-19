'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            styleExpanded: {
                options: {
                    outputStyle: 'expanded',
                    sourcemap: false
                },
                files: {
                    'app/css/style.css': 'sass/style.scss'
                }
            },

            styleMin: {
                options: {
                    outputStyle: 'compressed',
                    sourcemap: false
                },
                files: {
                    'app/css/style.min.css': 'sass/style.scss'
                }
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc.yaml'
            },
            target: [
                'app/main.js',
                'app/js/**/*.js',
                'app/modules/**/*.js',
                'app/nls/**/*.js'
            ]
        },
        watch: {
            watchSassStyle: {
                files: ['sass/style.scss', 'sass/components/*.scss'],
                tasks: ['sass_style'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            },
            eslint: {
                files: ['app/main.js', 'app/js/**/*.js', 'app/modules/**/*.js', 'app/nls/**/*.js'],
                tasks: ['eslint'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10
            },
            monitor: {
                tasks: [
                    'watch:watchSassStyle',
                    'watch:eslint',
                    'notify:watching'
                ]
            },
            release: {
                tasks: [
                    'sass_style',
                    'eslint',
                    'notify:release'
                ]
            }
        },
        notify: {
            sassStyleCompile: {
                options: {
                    enabled: true,
                    message: 'Sas Style Compiled!',
                    title: 'Style',
                    success: false,
                    duration: 1
                }
            },
            watching: {
                options: {
                    enabled: true,
                    message: 'Watching Files!',
                    title: 'Watching',
                    success: false,
                    duration: 1
                }
            },
            eslint: {
                options: {
                    enabled: true,
                    message: 'ESLint Files!',
                    title: 'ESLint',
                    success: false,
                    duration: 1
                }
            },
            release: {
                options: {
                    enabled: true,
                    message: 'Release task!',
                    title: 'Release',
                    success: false,
                    duration: 1
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-rename');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-testem');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('code_check', ['eslint', 'notify:eslint']);
    grunt.registerTask('sass_style', ['sass:styleExpanded', 'sass:styleMin', 'notify:sassStyleCompile']);

    grunt.registerTask('develop', ['concurrent:monitor']);
    grunt.registerTask('release', ['concurrent:release']);
};

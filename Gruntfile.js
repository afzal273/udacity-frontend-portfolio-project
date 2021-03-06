module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var config = grunt.file.readYAML('gruntConfig.yaml');
    grunt.initConfig({
        // resize images
        responsive_images: {
            // resize mail image
            main: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 1200,
                        suffix: '_large',
                        quality: 80
                    }, {
                        width: 800,
                        suffix: '_medium',
                        quality: 80
                    }, {
                        width: 400,
                        suffix: '_small',
                        quality: 80
                    }]
                },
                files: [{
                    expand: true,
                    src: '*-main.' + config.imgFormats,
                    cwd: config.imgSrcDir,
                    dest: config.imgDir
                }]
            },
            // resize featured images
            featured: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 600,
                        suffix: '_medium',
                        quality: 30
                    }, {
                        width: 300,
                        suffix: '_small',
                        quality: 30
                    }]
                },
                files: [{
                    expand: true,
                    src: '*-featured.' + config.imgFormats,
                    cwd: config.imgSrcDir,
                    dest: config.imgDir
                }]
            }
        },

        // Clear out the images directory if it exists and css/js
        clean: {
            dev: {
                src: [
                    config.imgDir + '*.' + config.imgFormats, config.jsDir + '*.min.js',
                    config.cssDir + '*.min.css'
                ]
            }
        },

        // Copy vector images to dist dir
        copy: {
            vector: {
                expand: true,
                flatten: true,
                src: [
                    config.imgSrcDir + '*',
                    '!' + config.imgSrcDir + '*.' + config.imgFormats
                ],
                dest: config.imgDir
            }
        },

        // Concat css and js files
        concat: {
            vendorJS: {
                src: [
                    config.jsSrcDir + config.vendorDir + 'jquery-1.11.3.min.js',
                    config.jsSrcDir + config.vendorDir + 'bootstrap.min.js',
                    config.jsSrcDir + config.vendorDir + 'bootstrap-dialog.min.js'
                ],
                dest: config.jsDir + config.vendorMinJs
            },
            vendorCSS: {
                src: [
                    config.cssSrcDir + config.vendorDir + 'bootstrap.min.css',
                    config.cssSrcDir + config.vendorDir + 'bootstrap-dialog.min.css',
                    config.cssSrcDir + config.vendorDir + 'zocial.min.css'
                ],
                dest: config.cssDir + config.vendorMinCss
            },
            JS: {
                nonull: false,
                src: config.jsSrcDir + config.minJs,
                dest: config.jsDir + config.appMinJs
            },
            CSS: {
                nonull: false,
                src: config.cssSrcDir + config.minCss,
                dest: config.cssDir + config.appMinCss
            }
        },
        // lint js and exclude minified js files
        jshint: {
            all: [
                'Gruntfile.js',
                config.jsSrcDir + '*.js',
                '!' + config.jsSrcDir + '*.min.js'

            ]

        },
        // lint css and exclude minified css
        csslint: {
            options: {
                processImport: false
            },
            all: [
                config.cssSrcDir + '*.css',
                '!' + config.cssSrcDir + '*.min.css'
            ]
        },
        //minify css
        cssmin: {
            options: {
                processImport: false
            },
            target: {
                files: [{
                    expand: true,
                    cwd: config.cssSrcDir,
                    src: ['*.css', '!*.min.css'],
                    dest: config.cssSrcDir,
                    ext: '.min.css'
                }, {
                    expand: true,
                    cwd: config.cssSrcDir + config.vendorDir,
                    src: ['*.css', '!*.min.css', '!bootstrap.css'],
                    dest: config.cssSrcDir + config.vendorDir,
                    ext: '.min.css'
                }]
            }
        },
        //minify js
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: config.jsSrcDir,
                    src: ['*.js', '!*.min.js'],
                    dest: config.jsSrcDir,
                    rename: function(cwd, src) {
                        return cwd + src.replace('.js', '') + '.min.js';
                    }
                }, {
                    expand: true,
                    cwd: config.jsSrcDir + config.vendorDir,
                    src: ['*.js', '!*.min.js'],
                    dest: config.jsSrcDir + config.vendorDir,
                    rename: function(cwd, src) {
                        return cwd + src.replace('.js', '') + '.min.js';
                    }
                }]
            }
        },
        //lint html
        htmllint: {
            all: "*.html"
        },
        // replace js/css files with minified versions in html
        replace: {
            html: {
                src: '*.html',
                overwrite: true,
                replacements: [{
                    from: "href=\"css/style.css\"",
                    to: "href=\"dist/css/portfolio.min.css\""
                }, {
                    from: "src=\"js/portfolio.js\"",
                    to: "src=\"dist/js/portfolio.min.js\""
                }]
            }
        },
        //beautify js, css, html
        jsbeautifier: {
            src: ['*.js', 'js/*.js', '!js/*.min.js', '*.html', 'css/*.css', '!css/*.min.css']

        }
    });
    grunt.registerTask('default', ['htmllint', 'jshint', 'csslint', 'jsbeautifier', 'cssmin', 'uglify', 'clean', 'concat', 'copy', 'responsive_images', 'replace']);
    //grunt.registerTask('default', ['htmllint','jshint', 'csslint', 'cssmin', 'uglify', 'clean', 'concat','copy','responsive_images']);
    //grunt.registerTask('default', ['htmllint', 'jshint', 'csslint', 'cssmin', 'uglify', 'concat']);
    // order -> lint html, css, js, minify css/js and then concat
    // copy images, clean, make images responsive

};

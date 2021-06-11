var fs = require('fs');
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var tslint = require('gulp-eslint');
var tslintCustom = require('eslint');
var mocha = require('gulp-mocha');
var exec = require('child_process').exec;
var { promisify } = require('util');
var fancyLog = require('fancy-log');
// @ts-ignore
require('dotbin');

var trim = (s) => {
    return s ? s.trim() : undefined;
}

var clean = (obj, prod) => {
    let files = obj.debug || [];
    if (prod) {
        files = obj.prod || [];
    }
    const staticFilesToDelete = [
        './tsconfig-incremental.tsbuildinfo'
    ];

    files = (obj.default || []).concat(files || []);
    files.push(...staticFilesToDelete);
    let promises = [];
    for (const r of files) {
        promises.push(del(dirResult + '/' + r));
    }
    return Promise.all(promises);
}

var copy = (obj, prod, done) => {
    let files = obj.debug || [];
    if (prod) {
        files = obj.prod || [];
    }
    files = (obj.default || []).concat(files || []);
    let d;
    for (const c of files) {
        d = gulp.src(c.files).pipe(gulp.dest(dirResult + '/' + c.out));
    }
    return d ? d : done();
}

const options = {
    outBaseDir: {
        debug: '.',
        prod: './dist',
    },
    tsConfig: {
        debug: 'tsconfig.json',
        prod: 'tsconfig-prod.json'
    },
    swagger: {
        copy: {
            default: [
                {
                    files: ['./schema/Models/Accession/*.json', './schema/RestfulModels/**/*.json', './schema/API/**/*.json'],
                    out: 'schemas'
                }
            ]
        },
        remove: {
            default: [
                'lib/handlers/_swagger.json'
            ],
            after: {
                default: [
                    'schemas'
                ]
            }
        }
    },
    copy: {
        prod: [
            {
                files: ['package.json', '.npmrc', '.yarnrc', 'yarn.lock', './prod_config/**/*'], // ['package.json', 'logger-config.js', './prod_config/**/*']
                out: '.'
            },
            {
                files: ['./docs/templates/**/*'],
                out: './templates'
            },
            {
                files: ['./doc2pdf/**/*'],
                out: './doc2pdf'
            },
            {
                files: ['./msg/*'],
                out: './msg'
            },
            {
                files: [
                    './schema/Models/Accession/*.json',
                    './schema/Models/Accession/*.js',
                    './schema/Models/Accession/readme.txt'
                ],
                out: ['./entities']
            }
        ]
    },
    remove: {
        debug: [
            'schemas',
            'lib',
            'test',
            'index.js',
            'index.js.map',
            'index.d.ts'
        ],
        prod: [
            '.',
            '../distZip/**/*'
        ],
        after: {
            prod: [
                'test',
                '**/*.d.ts',
                '**/*.js.map',
                '.yarnrc',
                '.npmrc'
            ]
        }
    }
};

const mode = (process.argv.length === 3 && process.argv[2] === 'production' ? 'PROD' : 'DEBUG');
const dirResult = (mode === 'PROD') ? options.outBaseDir.prod : options.outBaseDir.debug;
const tsConfig = (mode === 'PROD') ? options.tsConfig.prod : options.tsConfig.debug;

var tsFilesGlob = ((c) => { return c.filesGlob || c.files || 'src/**/*.ts'; })(require('./' + options.tsConfig.debug));

/*********************************************
 * ******* GENERATION DES ENTITES ***********
 * *******************************************/

gulp.task('codegen.entity', (cb) => {
    exec('npm run entity', (err, stdout, stderr) => {
        console.log("Using bo-code-gen Entity");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('codegen.view', (cb) => {
    exec('npm run view', (err, stdout, stderr) => {
        console.log("Using bo-code-gen View");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('codegen.spo', (cb) => {
    exec('npm run sql-spo', (err, stdout, stderr) => {
        console.log("Using sql-schema-gen Schemas");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/*********************************************
 * **************** SWAGGER ******************
 * *******************************************/

gulp.task('swagger-clean', (done) => {
    if (mode === 'DEBUG') {
        return clean(options.swagger.remove, false);
    }
    return done();
});

gulp.task('swagger-copy', (done) => {
    return copy(options.swagger.copy, mode === 'PROD', done);
});

gulp.task('swagger-process', async () => {
    let buildTools = require('./buildTools');
    await buildTools.BuildTools.genSwagger({ baseDir: __dirname + '/' + dirResult }, dirResult + "/");
});

gulp.task('swagger-clean-after', () => {
    return clean(options.swagger.remove.after, mode === 'PROD');
});

gulp.task('swagger', gulp.series('swagger-clean', 'swagger-copy', 'swagger-process', 'swagger-clean-after'));

/*********************************************
 * ************** COMPILATION ****************
 * *******************************************/

// Lints all TypeScript source files
gulp.task('lint', () => {

    // let program = tslintCustom.Linter.createProgram('tsconfig.json');
    // let files = tslintCustom.Linter.getFileNames(program);
    return gulp.src(['src/**/*.ts'])
        .pipe(tslint())
        .pipe(tslint.format())
        .pipe(tslint.failAfterError());

});

function compileProject(tsconfigFile, cb) {
    exec(`tsc --project ${tsconfigFile}`, function (err, stdout, stderr) {
        stdout = trim(stdout);
        stderr = trim(stderr);
        if (err) {
            fancyLog.error(stdout);
            if (stderr && stderr.length) {
                fancyLog.error(stderr);
            }
            // @ts-ignore
            err.showStack = false;
        } else {
            if (stdout) {
                fancyLog.info(stdout);
            }
        }
        cb(err);
    });
}
gulp.task('ic', (cb) => compileProject('./tsconfig-incremental.json', cb));

// Compiles all TypeScript source files
gulp.task('run-compile', (cb) => {
    // @ts-ignore
    exec('tsc --version', (err, stdout, stderr) => {
        stdout = trim(stdout);
        if (stdout) {
            fancyLog.info('Compiling using TypeScript', stdout);
        }
        if (err) {
            // @ts-ignore
            err.showStack = false;
            fancyLog.error(err);
            cb(err);
        } else {
            compileProject(tsConfig, cb);
        }
    });

    // var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    // var tsResult = gulp.src(path.resolve('./src/**/*.ts'))
    //     .pipe(sourcemaps.init())
    //     .pipe(tsProject());
    // return merge([
    //     tsResult.dts.pipe(gulp.dest(dirResult)),
    //     tsResult.js
    //         .pipe(sourcemaps.write('.'))
    //         .pipe(gulp.dest(path.resolve(dirResult)))
    // ]);
});
gulp.task('compile', gulp.series('lint', 'run-compile'));

/*********************************************
 * ***************** CLEAN *******************
 * *******************************************/

// Clean directory
gulp.task('clean', () => {
    return clean(options.remove, mode === 'PROD');
});

// Clean directory
gulp.task('clean-after', () => {
    return clean(options.remove.after, mode === 'PROD');
});

/*********************************************
 * ***************** DEBUG *******************
 * *******************************************/
gulp.task('build', gulp.series('clean', 'compile', 'swagger', 'clean-after'));

/*********************************************
 * ************** PRODUCTION *****************
 * *******************************************/

gulp.task('prod-increment-build', async () => {
    let buildTools = require('./buildTools');
    await buildTools.BuildTools.genNumBuild(dirResult + '/');
});

gulp.task('prod-copy', (done) => {
    return copy(options.copy, true, done);
});

gulp.task('prod-install', (cb) => {
    // --frozen-lockfile
    exec('yarn install --production=true --silent',
        {
            cwd: dirResult,
        },
        (error, stdout, stderr) => {
            console.log(stdout);
            console.error(stderr);
            if (error) {
                cb(error);
            } else {
                cb();
            }
        });
});

// Create a dist production directory
gulp.task('production', gulp.series('clean', 'compile', 'swagger', 'prod-copy', 'prod-increment-build', 'prod-install', 'clean-after'));

/*********************************************
 * ************** GULP DEFAUT ***************
 * *******************************************/
gulp.task('default', gulp.series('build'));

/*********************************************
 * **************** AUTRES *****************
 * *******************************************/

// Runs the Jasmine test specs
gulp.task('run-test', () => {
    return gulp.src(options.outBaseDir.debug + '/test/*.js')
        .pipe(mocha({
            // @ts-ignore
            colors: false,
        }));
});

gulp.task('run-demo-test', () => {
    return gulp.src(options.outBaseDir.debug + '/test/demo/demo-test.test.js')
        .pipe(mocha({
            // @ts-ignore
            colors: false,
        }));
});

gulp.task('run-droits-test', () => {
    return gulp.src(options.outBaseDir.debug + '/test/droits/*.test.js')
        .pipe(mocha({
            // @ts-ignore
            colors: false,
        }));
});


gulp.task('test', gulp.series('build', 'run-test'));

gulp.task('run-testx', gulp.series('build', () => {
    return gulp.src(options.outBaseDir.debug + '/test/GP.test.js')
        .pipe(mocha({
            // @ts-ignore
            colors: false,
        }));
}));
gulp.task('testx', gulp.series('build', 'run-testx'));

gulp.task('run-testy', () => {
    return gulp.src(options.outBaseDir.debug + '/test/droits/*.test.js"')
        .pipe(mocha({
            // @ts-ignore
            colors: false,
        }));
});
gulp.task('testy', gulp.series('compile', 'run-testy'));
// Watches ts source files and runs build on change
gulp.task('watch', () => {
    gulp.watch(tsFilesGlob, gulp.series('build', 'test'));
});

// change latest in package.json
gulp.task('change-latest', async () => {
    // @ts-ignore
    let p = require('./package.json');
    console.log(`Change latest in ${p.name}`);
    const spackages = [
        {
            po: p.dependencies || [],
            flag: ''
        }, {
            po: p.devDependencies || [],
            flag: ' -D'
        },
    ];
    const packages = spackages.map((o) => {
        return Object.getOwnPropertyNames(o.po)
            .map((pName) => {
                return {
                    name: pName, value: o.po[pName], flag: o.flag
                };
            })
            .filter((o) => o.value === 'latest')
            .map((o) => {
                return {
                    name: o.name,
                    flag: o.flag,
                };
            })
    }).reduce((x, v) => {
        return x.concat(v);
    }, []);
    console.log(`Packages to change: ${packages.map((o) => o.name + ' ' + o.flag)}`);
    if (packages.length === 0) {
        return;
    }
    const execPromise = promisify(exec);
    for (const o of packages) {
        for (const cmd of [
            `yarn remove ${o.name}`,
            `yarn add ${o.name}${o.flag}`,
        ]) {
            const execResult = await execPromise(cmd);
            // @ts-ignore
            if (execResult.error) {
                // @ts-ignore
                throw execResult.error;
            }
            console.log(execResult.stdout);
            console.error(execResult.stderr);
        }
    }
});
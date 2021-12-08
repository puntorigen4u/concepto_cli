(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.concepto_cli = factory());
})(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    //decorators
    var command = function (desc, usage) {
        return function (target, key, descriptor) {
            var original = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                //let usage = target[key+'_usage']();
                if (!this.usage)
                    this.usage = {};
                if (!this.commands)
                    this.commands = {};
                this.usage[key] = usage; //declare it for CLI knowledge
                this.commands[key] = desc; //declare it for CLI knowledge
                //modify/normalize args before calling original method
                var norm = args[0];
                if (!norm._init) {
                    norm._.shift(); // remove command name
                    for (var _a = 0, usage_1 = usage; _a < usage_1.length; _a++) {
                        var option = usage_1[_a];
                        var aliases = option;
                        var short = option[0][1];
                        if (short != '-') {
                            aliases.shift(); // remove short from aliases
                            aliases.pop(); // remove desc
                            var main = aliases.shift().replace('--', '');
                            if (norm[short]) {
                                norm[main] = norm[short]; // assign value to 'main' property name
                                delete norm[short]; //erases short type
                            }
                            // assign all posible combinations to main from norm
                            for (var ori in norm) {
                                if (ori != '_' && aliases.includes(ori)) {
                                    if (norm[ori]) {
                                        norm[main] = norm[ori];
                                        delete norm[ori];
                                    }
                                }
                            }
                        }
                    }
                    original.apply(this, [norm]); //call original method (only if not from init)
                }
            };
        };
    };
    var cli = function (constructor) {
        for (var method in constructor.prototype) {
            constructor.prototype[method]({ _init: true });
        }
    };

    var mount = function (file) {
        return new Promise(function (resolve, reject) {
            var dmg = require('dmg');
            dmg.mount(file, function (err, path) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(path);
                }
            });
        });
    };
    var unmount = function (file) {
        return new Promise(function (resolve, reject) {
            var dmg = require('dmg');
            dmg.unmount(file, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('');
                }
            });
        });
    };

    var download = function (url, filename, dir, onProgress) {
        return new Promise(function (resolve, reject) {
            var dl = require('download-file-with-progressbar');
            dl(url, {
                filename: filename,
                dir: dir,
                onDone: function (info) {
                    resolve(info);
                },
                onProgress: function (curr, total) {
                    onProgress(curr, total);
                },
                onError: function (err) {
                    reject(err);
                }
            });
        });
    };

    var open_console = require('open_console');
    var prompts = require('prompts');
    var x_console = new open_console();
    //
    var concepto_cli = /** @class */ (function () {
        function concepto_cli(arg) {
        }
        concepto_cli.prototype.create = function (arg) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, deploy_opts, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (arg._.length > 0)
                                arg.name = arg._[0];
                            if (arg.name)
                                console.log('create->' + arg.name);
                            console.log('');
                            if (!!arg.name) return [3 /*break*/, 2];
                            _a = arg;
                            return [4 /*yield*/, prompts({
                                    type: 'text',
                                    name: 'value',
                                    message: "What's the application's name",
                                    validate: function (value) {
                                        if (value.length < 3)
                                            return "Name to short!";
                                        if (value.trim().indexOf(' ') != -1)
                                            return "Name cannot contain spaces!";
                                        return true;
                                    }
                                })];
                        case 1:
                            _a.name = (_f.sent()).value;
                            _f.label = 2;
                        case 2:
                            if (!!arg.type) return [3 /*break*/, 4];
                            _b = arg;
                            return [4 /*yield*/, prompts({
                                    type: 'select',
                                    name: 'value',
                                    message: "Choose an application type",
                                    choices: [
                                        { title: 'Frontend ->  NuxtJS + VUE', value: 'vue', description: "VueJS web app builder; can publish to S3 if set to static" },
                                        //{ title: 'Frontend - NestJS + React', disabled:true, value:'react', description: `ReactJS web app builder; can publish to S3 if set to static` },
                                        { title: 'Backend  ->  ExpressJS + Sequelize', value: 'eb', description: "NodeJS backend with sequelize for DB handling" },
                                        { title: 'Backend  ->  NestJS + Typescript', disabled: true, value: 'nest', description: "Experimental NestJS backend with typescript support" }
                                    ],
                                    initial: 0
                                })];
                        case 3:
                            _b.type = (_f.sent()).value;
                            _f.label = 4;
                        case 4:
                            deploy_opts = [
                                { title: 'Just locally', value: 'local' },
                                { title: 'Amazon Web Services', value: 'aws' },
                                { title: 'Github Pages', value: 'gh-pages' },
                            ];
                            if (arg.type != 'vue' && arg.type != 'react')
                                deploy_opts.splice(2, 1);
                            if (!!arg.deploy) return [3 /*break*/, 6];
                            _c = arg;
                            return [4 /*yield*/, prompts({
                                    type: 'select',
                                    name: 'value',
                                    message: "Where will you deploy this app?",
                                    choices: deploy_opts,
                                    initial: 0
                                })];
                        case 5:
                            _c.deploy = (_f.sent()).value;
                            _f.label = 6;
                        case 6:
                            if (!(arg.deploy == 'aws' && (arg.type == 'vue' || arg.type == 'react'))) return [3 /*break*/, 8];
                            _d = arg;
                            return [4 /*yield*/, prompts({
                                    type: 'select',
                                    name: 'value',
                                    message: "In what AWS service do you plan to host it?",
                                    choices: [
                                        { title: 'Elasticbean', value: 'eb' },
                                        { title: 'S3', value: 's3' }
                                    ],
                                    initial: 1
                                })];
                        case 7:
                            _d.deploy = (_f.sent()).value;
                            arg.static = false;
                            if (arg.deploy == 's3')
                                arg.static = true;
                            return [3 /*break*/, 9];
                        case 8:
                            if (arg.deploy == 'gh-pages') {
                                arg.static = true;
                            }
                            _f.label = 9;
                        case 9:
                            if (!(arg.deploy == 'local' && !arg.static && (arg.type == 'vue' || arg.type == 'react'))) return [3 /*break*/, 11];
                            _e = arg;
                            return [4 /*yield*/, prompts({
                                    type: 'toggle',
                                    name: 'value',
                                    message: "Do you wish to generate static files for deployment?",
                                    initial: true,
                                    active: 'yes',
                                    inactive: 'no'
                                })];
                        case 10:
                            _e.static = (_f.sent()).value;
                            _f.label = 11;
                        case 11:
                            //VUE options
                            if (arg.type == 'vue') ;
                            console.log('');
                            console.log('received args', arg);
                            return [2 /*return*/];
                    }
                });
            });
        };
        concepto_cli.prototype.install = function (arg) {
            return __awaiter(this, void 0, void 0, function () {
                var path, homedir, appsFolder, progress, os, bar_1, tmpFolder, dmg, spinner, mount_path, abs_source, abs_target, fs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('');
                            if (!(process.platform == 'darwin')) return [3 /*break*/, 5];
                            path = require('path');
                            homedir = require('os').homedir();
                            appsFolder = path.join(homedir, 'Applications', 'Applications');
                            if (!arg['target-dir']) {
                                arg['target-dir'] = appsFolder;
                            }
                            else {
                                arg['target-dir'] = arg['target-dir'].replace('~', homedir);
                            }
                            progress = require('cli-progress');
                            os = require('os');
                            bar_1 = new progress.SingleBar({
                                format: 'downloading {bar} | {percentage}% | ETA: {eta}s',
                                hideCursor: true,
                                clearOnComplete: true
                            }, progress.Presets.shades_classic);
                            bar_1.start(100, 0);
                            tmpFolder = os.tmpdir();
                            return [4 /*yield*/, download('https://concepto-dsl.s3.amazonaws.com/Concepto.dmg', 'concepto.dmg', tmpFolder, function (curr, total) {
                                    bar_1.setTotal(total);
                                    bar_1.update(curr);
                                })];
                        case 1:
                            dmg = _a.sent();
                            bar_1.stop();
                            spinner = x_console.spinner({ color: 'cyan' });
                            spinner.start('installing ..');
                            return [4 /*yield*/, mount(dmg.path)];
                        case 2:
                            mount_path = _a.sent();
                            abs_source = path.join(mount_path, 'Concepto DSL.app');
                            abs_target = path.join(appsFolder, 'Concepto DSL.app');
                            fs = require('fs-extra');
                            return [4 /*yield*/, fs.copy(abs_source, abs_target, { overwrite: true })];
                        case 3:
                            _a.sent();
                            //cleanup
                            return [4 /*yield*/, unmount(mount_path)];
                        case 4:
                            //cleanup
                            _a.sent();
                            //end
                            spinner.text('installed succesfully');
                            spinner.succeed();
                            return [3 /*break*/, 6];
                        case 5:
                            x_console.out({ color: 'red', message: 'Only macOS is currently supported; stay tune for the Windows version!' });
                            _a.label = 6;
                        case 6:
                            console.log('');
                            return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            command('Creates a new Concepto DSL application', [
                ['-t', '--type', 'Specifies the application type (vue,eb,nest)'],
                ['-n', '--name', 'Specifies the application name'],
                ['-d', '--deploy', 'Specifies deploy type (local,aws,gh-pages)'],
                ['--aws-access', 'Specifies AWS access key'],
                ['--aws-secret', 'Specifies AWS secret key'],
                ['--secrets-pass', 'Set the default .secrets-pass password'],
            ])
        ], concepto_cli.prototype, "create", null);
        __decorate([
            command('Downloads and installs Concepto DSL IDE', [
                ['-t', '--target-dir', 'Specifies the app folder location (defaults:~/Applications)'],
            ])
        ], concepto_cli.prototype, "install", null);
        concepto_cli = __decorate([
            cli
        ], concepto_cli);
        return concepto_cli;
    }());

    return concepto_cli;

}));

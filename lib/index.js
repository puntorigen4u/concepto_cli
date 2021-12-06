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

    /**
    * Concepto CLI: Helper class for command-line utils.
    * @name 	concepto_cli
    * @module 	concepto_cli
    **/
    var open_console = require('open_console');
    new open_console();
    //decorators
    var command = function (usage) {
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
                this.usage[key] = usage; //declare it for CLI knowledg
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
    //
    var concepto_cli = /** @class */ (function () {
        function concepto_cli(arg) {
        }
        concepto_cli.prototype.create = function (arg) {
            console.log('received args', arg);
        };
        __decorate([
            command([
                ['-t', '--type', 'Specifies the application type (vue,eb,nest)'],
                ['-n', '--name', 'Specifies the application name'],
                ['--aws-access', 'Specifies AWS access key'],
                ['--aws-secret', 'Specifies AWS secret key'],
                ['--secrets-pass', 'Set the default .secrets-pass password'],
            ])
        ], concepto_cli.prototype, "create", null);
        concepto_cli = __decorate([
            cli
        ], concepto_cli);
        return concepto_cli;
    }());

    return concepto_cli;

}));

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.concepto_cli = factory());
})(this, (function () { 'use strict';

    /**
    * Concepto CLI: Helper class for command-line utils.
    * @name 	concepto_cli
    * @module 	concepto_cli
    **/
    var open_console = require('open_console');
    new open_console();
    var concepto_cli = /** @class */ (function () {
        function concepto_cli(arg) {
        }
        concepto_cli.prototype.create = function (arg) {
        };
        concepto_cli.prototype.create_usage = function () {
            //prints options usage
            var info = [
                ['-t', '--type', 'Specifies the application type (vue,eb,nest)'],
                ['-n', '--name', 'Specifies the application name'],
                ['--aws-access', 'Specifies AWS access key'],
                ['--aws-secret', 'Specifies AWS secret key'],
                ['--secrets-pass', 'Set the default .secrets-pass password'],
            ];
            return info;
        };
        return concepto_cli;
    }());

    return concepto_cli;

}));

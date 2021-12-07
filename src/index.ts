/**
* Concepto CLI: Helper class for command-line utils.
* @name 	concepto_cli
* @module 	concepto_cli
**/
import { cli,command } from './decorators'
const download = require('download-file-with-progressbar');
const open_console = require('open_console');
const prompts = require('prompts');
const x_console = new open_console();
//

@cli
export default class concepto_cli {
    usage:any
    commands:any

	constructor(arg:{silent?:boolean}={silent:true}) {
    }

    @command('Generates a Concepto DSL application',[
        ['-t','--type', 'Specifies the application type (vue,eb,nest)'],
        ['-n','--name', 'Specifies the application name'],
        ['--aws-access','Specifies AWS access key'],
        ['--aws-secret','Specifies AWS secret key'],
        ['--secrets-pass','Set the default .secrets-pass password'],
    ])
    async create(arg:any) {
        if (typeof arg.name === undefined) arg.name = (await prompts({
            type: 'text',
            name: 'value',
            message: `What's the applicacion name`,
            validate: value => value.length<5 ? `Name to short!`:true
        })).value;
        console.log('received args',arg);
    }

    @command('Downloads and installs Concepto DSL IDE',[])
    async install(arg:any) {
        process.cwd();
        //download-file-with-progressbar
    }

}
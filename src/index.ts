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
        console.log('');
        if (arg._.length>0) arg.name = arg._[0];
        if (!arg.name) arg.name = (await prompts({
            type: 'text',
            name: 'value',
            message: `What's the applicacion name`,
            validate: value => {
                if (value.length<5) return `Name to short!`;
                if (value.trim().indexOf(' ')!=-1) return `Name cannot contain spaces!`;
                return true; 
            }
        })).value;
        if (!arg.type) arg.type = (await prompts({
            type: 'select',
            name: 'value',
            message: `Choose an application type`,
            choices: [
                { title: 'Frontend - NuxtJS + VueJS', value:'vue', description: `Static VueJS page builder; can publish to S3` },
                { title: 'Backend  - ExpressJS + Sequelize', value:'eb', description: `NodeJS backend with sequelize for DB handling` },
                { title: 'Backend  - NestJS + Typescript', disabled:true, value:'nest', description: `Experimental NestJS backend with typescript support` }
            ],
            initial: 1
        })).value;
        console.log('');
        console.log('received args',arg);
    }

    @command('Downloads and installs Concepto DSL IDE',[])
    async install(arg:any) {
        process.cwd();
        //download-file-with-progressbar
    }

}
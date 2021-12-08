/**
* Concepto CLI: Helper class for command-line utils.
* @name 	concepto_cli
* @module 	concepto_cli
**/
import { cli,command } from './decorators'
import { mount, unmount } from './dmg'
import { download } from './download'

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

    @command('Creates a new Concepto DSL application',[
        ['-t','--type', 'Specifies the application type (vue,eb,nest)'],
        ['-n','--name', 'Specifies the application name'],
        ['-d','--deploy', 'Specifies deploy type (local,aws,gh-pages)'],
        ['--aws-access','Specifies AWS access key'],
        ['--aws-secret','Specifies AWS secret key'],
        ['--secrets-pass','Set the default .secrets-pass password'],
    ])
    async create(arg:any) {
        if (arg._.length>0) arg.name = arg._[0];
        if (arg.name) console.log('create->'+arg.name);
        console.log('');
        //required arguments
        if (!arg.name) arg.name = (await prompts({
            type: 'text',
            name: 'value',
            message: `What's the application's name`,
            validate: value => {
                if (value.length<3) return `Name to short!`;
                if (value.trim().indexOf(' ')!=-1) return `Name cannot contain spaces!`;
                return true; 
            }
        })).value;
        if (!arg.type) arg.type = (await prompts({
            type: 'select',
            name: 'value',
            message: `Choose an application type`,
            choices: [
                { title: 'Frontend ->  NuxtJS + VUE', value:'vue', description: `VueJS web app builder; can publish to S3 if set to static` },
                //{ title: 'Frontend - NestJS + React', disabled:true, value:'react', description: `ReactJS web app builder; can publish to S3 if set to static` },
                { title: 'Backend  ->  ExpressJS + Sequelize', value:'eb', description: `NodeJS backend with sequelize for DB handling` },
                { title: 'Backend  ->  NestJS + Typescript', disabled:true, value:'nest', description: `Experimental NestJS backend with typescript support` }
            ],
            initial: 0
        })).value;
        let deploy_opts = [
            { title: 'Just locally', value:'local' },
            { title: 'Amazon Web Services', value:'aws' },
            { title: 'Github Pages', value:'gh-pages' },
        ];
        if (arg.type!='vue' && arg.type!='react') deploy_opts.splice(2,1);
        if (!arg.deploy) arg.deploy = (await prompts({
            type: 'select',
            name: 'value',
            message: `Where will you deploy this app?`,
            choices: deploy_opts,
            initial: 0
        })).value;
        if (arg.deploy=='aws' && (arg.type=='vue' || arg.type=='react')) {
            arg.deploy = (await prompts({
                type: 'select',
                name: 'value',
                message: `In what AWS service do you plan to host it?`,
                choices: [
                    { title: 'Elasticbean', value:'eb' },
                    { title: 'S3', value:'s3' }
                ],
                initial: 1
            })).value;
            arg.static = false;
            if (arg.deploy=='s3') arg.static = true;
        } else if (arg.deploy=='gh-pages') {
            arg.static = true;
        }
        //additional arguments based on prev arguments
        if (arg.deploy=='local' && !arg.static && (arg.type=='vue' || arg.type=='react')) arg.static = (await prompts({
            type: 'toggle',
            name: 'value',
            message: `Do you wish to generate static files for deployment?`,
            initial: true,
            active: 'yes',
            inactive: 'no'
        })).value;
        //VUE options
        if (arg.type=='vue') {
            //VUE arguments
            //console.log('');
            //x_console.out({ message:'VUE DSL', color:'yellow' });
        }
        console.log('');
        console.log('received args',arg);
    }

    @command('Downloads and installs Concepto DSL IDE',[
        ['-t','--target-dir', 'Specifies the app folder location (defaults:~/Applications)'],
    ])
    async install(arg:any) {
        console.log('');
        //x_console.out({ message:'Downloading Concepto DSL IDE ..', color:'yellow' });
        if (process.platform=='darwin') {
            //target folder
            const path = require('path');
            const homedir = require('os').homedir();
            const appsFolder = path.join(homedir, 'Applications', 'Applications');
            if (!arg['target-dir']) {
                arg['target-dir'] = appsFolder;
            } else {
                arg['target-dir'] = arg['target-dir'].replace('~',homedir);
            }
            //download progress bar
            const progress = require('cli-progress');
            const os = require('os');
            const bar = new progress.SingleBar({
                format: 'downloading {bar} | {percentage}% | ETA: {eta}s',
                hideCursor: true,
                clearOnComplete: true
            }, progress.Presets.shades_classic);
            bar.start(100,0);
            //download
            const tmpFolder = os.tmpdir();
            let dmg:any = await download('https://concepto-dsl.s3.amazonaws.com/Concepto.dmg', 'concepto.dmg', tmpFolder, function(curr,total) {
                bar.setTotal(total);
                bar.update(curr);
            });
            bar.stop();
            //install
            const spinner = x_console.spinner({ color:'cyan' });
            spinner.start('installing ..');
            const mount_path = await mount(dmg.path);
            const abs_source = path.join(mount_path, 'Concepto DSL.app');
            const abs_target = path.join(appsFolder, 'Concepto DSL.app');
            //todo: extract and show Concepto version from mount_path (/Volumes/Concepto DSL v1.2.6/)
            const fs = require('fs-extra');
            const execCopy = await fs.copy(abs_source,abs_target,{ overwrite:true });
            //cleanup
            await unmount(mount_path);
            //end
            spinner.text('installed succesfully');
            spinner.succeed();
            //
        } else {
            x_console.out({ color:'red', message:'Only macOS is currently supported; stay tune for the Windows version!' });
        }
        console.log('');
    }
}


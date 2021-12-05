/**
* Concepto CLI: Helper class for command-line utils.
* @name 	concepto_cli
* @module 	concepto_cli
**/
const open_console = require('open_console');
const x_console = new open_console();

export default class concepto_cli {
    
	constructor(arg:{silent?:boolean}={silent:true}) {
    }

    create(arg:any) {

    }

    create_usage() {
        //prints options usage
        const info = [
            ['-t','--type', 'Specifies the application type (vue,eb,nest)'],
            ['-n','--name', 'Specifies the application name'],
            ['--aws-access','Specifies AWS access key'],
            ['--aws-secret','Specifies AWS secret key'],
            ['--secrets-pass','Set the default .secrets-pass password'],
        ];
        return info;
    }

}
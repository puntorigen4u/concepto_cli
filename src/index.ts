/**
* Concepto CLI: Helper class for command-line utils.
* @name 	concepto_cli
* @module 	concepto_cli
**/
const open_console = require('open_console');
const x_console = new open_console();

const command = (target: Object, key: string, descriptor: PropertyDescriptor) =>  {
    const original = descriptor.value;
    descriptor.value = function(...args) {
        let usage = target[key+'_usage']();
        //modify/normalize args before calling original method
        let norm = args[0];
        norm._.shift(); // remove command name
        for (let option of usage) {
            let aliases:any = option;
            let short = option[0][1];
            if (short!='-') {
                aliases.shift(); // remove short from aliases
                aliases.pop(); // remove desc
                let main = aliases.shift().replace('--','');
                if (norm[short]) {
                    norm[main] = norm[short]; // assign value to 'main' property name
                    delete norm[short]; //erases short type
                }
                // assign all posible combinations to main from norm
                for (let ori in norm) {
                    if (ori!='_' && aliases.includes(ori)) {
                        if (norm[ori]) {
                            norm[main] = norm[ori];
                            delete norm[ori];
                        }
                    }
                }
            }
        }
        original.apply(this, [norm]); //call original method
    }
};

export default class concepto_cli {
    usage:any

	constructor(arg:{silent?:boolean}={silent:true}) {
    }

    @command
    create(arg:any) {
        console.log('received args',arg);
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
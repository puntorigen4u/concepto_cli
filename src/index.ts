/**
* Concepto CLI: Helper class for command-line utils.
* @name 	concepto_cli
* @module 	concepto_cli
**/
const open_console = require('open_console');
const x_console = new open_console();

//decorators
const command = (desc:String, usage:any) =>
    (target: Object, key: string, descriptor: PropertyDescriptor) =>  {
    const original = descriptor.value;
    descriptor.value = function(...args) {
        //let usage = target[key+'_usage']();
        if (!this.usage) this.usage = {};
        if (!this.commands) this.commands = {};
        this.usage[key] = usage; //declare it for CLI knowledge
        this.commands[key] = desc; //declare it for CLI knowledge
        //modify/normalize args before calling original method
        let norm = args[0];
        if (!norm._init) {        
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
            original.apply(this, [norm]); //call original method (only if not from init)
        }
    }
};
const cli = (constructor: Function) => {
    for (const method in constructor.prototype) {
        constructor.prototype[method]({ _init:true });
    }
};
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
    create(arg:Object) {
        console.log('received args',arg);
    }

    @command('Downloads and installs Concepto DSL IDE',[])
    install(arg:Object) {

    }

}
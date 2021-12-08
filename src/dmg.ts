export const mount = function(file) {
    return new Promise((resolve,reject) => {
        const dmg = require('dmg');
        dmg.mount(file, (err,path)=>{
            if (err) {
                reject(err);
            } else {
               resolve(path);
            }
        });
    });
};
export const unmount = function(file) {
    return new Promise((resolve,reject) => {
        const dmg = require('dmg');
        dmg.unmount(file, (err)=>{
            if (err) {
                reject(err);
            } else {
               resolve('');
            }
        });
    });
};
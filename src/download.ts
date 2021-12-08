export const download = function(url:string,filename:string,dir:string,onProgress:any) {
    return new Promise((resolve,reject) => {
        const dl = require('download-file-with-progressbar');
        let dw = dl(url, {
            filename, dir,
            onDone: (info)=> {
                resolve(info)
            },
            onProgress: (curr,total) => {
                onProgress(curr,total);
            },
            onError: (err) => {
                reject(err);
            }
        });
    });
};
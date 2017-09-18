'use strict'

var ipfsAPI = require('ipfs-api')
const bl = require('bl')


// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})


let stream = ipfs.files.cat("QmTcr8MMP6XQYDigMYY6YnemGHTMtETZ8FXvgNsCLVF3ht");

let data = stream.pipe();

/*
function (err,stream) {

    stream.pipe(bl((err, data) => {
        let jsonfile = JSON.parse(data);
        console.log(jsonfile);


}))

}*/



/*
ipfs.files.cat("QmTcr8MMP6XQYDigMYY6YnemGHTMtETZ8FXvgNsCLVF3ht",function (err,file) {
    
    file.pipe(process.stdout);
    file.on('end', function() {
        console.log('finished');
    });
})
    */
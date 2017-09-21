'use strict'

var ipfsAPI = require('ipfs-api')
const bl = require('bl')
var url = require('url')

var http = require('http')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})


var server = http.createServer(function(req,res){
  if (req.method == 'GET'){
    var parts = url.parse(req.url, true)
    ipfs.files.cat("QmTcr8MMP6XQYDigMYY6YnemGHTMtETZ8FXvgNsCLVF3ht",function (err,file) {
      file.pipe(bl(function(err,data){
        console.log(data.toString())
        res.end(data.toString())
      }));
    })
  }else
    res.end('ciao')
})

server.listen(process.argv[2])


// connect to ipfs daemon API server





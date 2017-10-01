'use strict'

var Promise = require('promise')
const series = require('async/series')
var ipfsAPI = require('ipfs-api')
var fs = require('fs')
var bl = require('bl')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})


const files = [
  {
    path: 'test.txt',
    content: fs.createReadStream('test.txt')
}
]

ipfs.files.add(files, function (err, files) {
  // 'files' will be an array of objects
  console.log(files)
})


//stream.pipe(process.stdout)





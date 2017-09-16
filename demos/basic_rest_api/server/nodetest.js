'use strict'

const series = require('async/series')
const IPFS = require('ipfs')


const node = new IPFS()

node.on('ready', () => {
    // Your node is now ready to use \o/
    node.files.cat("QmWAyP98UjeCTSrU8eNx36qGZacZPPA7tEEodDuSDkR2fB", function (err, file) {
    console.log("uoouo");
    // file will be a stream containing the data of the file requested
})

    // stopping a node
    node.stop(() => {
    // node is now 'offline'
})
})
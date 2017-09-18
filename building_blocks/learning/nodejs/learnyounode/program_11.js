var http = require ('http')
var fs = require('fs')

var file_path = process.argv[3]

var server = http.createServer(function(req,res){

  fs.createReadStream(file_path,function(src){
    src.pipe(res)
    res.end()
  })

})

server.listen(parseInt(process.argv[2]))
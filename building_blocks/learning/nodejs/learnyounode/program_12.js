var http = require ('http')
var fs = require('fs')

var file_path = process.argv[3]

var server = http.createServer(function(req,res){

  res.writeHead(200,{'content-type':+'text/plain'})

  let src = fs.createReadStream(file_path)
  src.pipe(res)

})

server.listen(parseInt(process.argv[2]))
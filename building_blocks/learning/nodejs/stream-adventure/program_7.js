var http = require('http')
var through = require('through2')

var server = http.createServer(function(req,res){
  if(req.method=='POST'){
    //do stuff
    req.pipe(through(function(buf,_,next){
      
      this.push(buf.toString().toUpperCase())
      next()
    },function(done){done()})).pipe(res)

  }

  else{ res.end("nop...")}
})

server.listen(process.argv[2])
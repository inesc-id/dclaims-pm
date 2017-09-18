var http = require ('http')
var url = require('url')


function parseTime(time){
  return {hour:time.getHours(),
          minute:time.getMinutes(),
          second:time.getSeconds()
  }
}

function parseUnix(time){
  return {unixtime:time.getTime()}
}


//iso=2017-09-18T22:14:23.233Z

var server = http.createServer(function(req,res){
  if(req.method=='GET'){
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const time = new Date(url.parse(req.url,true).query.iso)


    var path = url.parse(req.url).pathname
    if(path.indexOf('api/parsetime')>-1 && typeof time == 'object'){
      res.end(JSON.stringify(parseTime(time)))
    }

    if(path.indexOf('api/unixtime')>-1 && typeof time == 'object'){
      res.end(JSON.stringify(parseUnix(time)))
    }




  }
})

server.listen(parseInt(process.argv[2]))
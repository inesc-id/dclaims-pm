var through = require('through2')
var split = require('split')
var input = process.stdin

var stream = through(write, end)
var counter=1

function write(buffer, encoding, next){
  let buff = buffer.toString()
  let out
  if(counter%2==0){
    out = buff.toUpperCase()+"\n"
  }if(counter%2!=0){
    out = buff.toLowerCase()+"\n"
  }
  counter+=1
  this.push(out)
  next()
}

function end(done){
  done()
}


input.pipe(split()).pipe(stream).pipe(process.stdout)
var through = require('through2')

var input = process.stdin

var stream = through(write, end)


function write(buffer, encoding, next){
  this.push(buffer.toString().toUpperCase())
  next()
}

function end(done){
  done()
}

input.pipe(stream).pipe(process.stdout)
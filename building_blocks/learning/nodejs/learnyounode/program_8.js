var http = require('http')
var bl = require('bl')


http.get(process.argv[2],function(response){
  response
    .pipe(bl(function(err,data){
      let size = data.toString().length
      let text = data.toString()

      console.log(size)
      console.log(text)
    }))
})
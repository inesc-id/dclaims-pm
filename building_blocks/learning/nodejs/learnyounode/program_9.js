var http = require('http')
var bl = require('bl')


http.get(process.argv[2],function(response){
  response
    .pipe(bl(function(err,data){
      let size = data.toString().length
      let text = data.toString()
      console.log(text)

      http.get(process.argv[3],function(response){
        response
          .pipe(bl(function(err,data){
            let size = data.toString().length
            let text = data.toString()
            console.log(text)

            http.get(process.argv[4],function(response){
              response
                .pipe(bl(function(err,data){
                  let size = data.toString().length
                  let text = data.toString()
                  console.log(text)
                }))
            })
          }))
      })
    }))
})
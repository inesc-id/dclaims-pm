var fs = require('fs')


fs.readFile(process.argv[2],'utf8',function(err,data){
  let splitedStrings = data.split('\n')
  console.log(splitedStrings.length-1)
  
})






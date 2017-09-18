var program_6_module = require ('./program_6_module.js')

program_6_module(process.argv[2],process.argv[3],function(err, data){
  if(err){
    return callback(err)
  }
})
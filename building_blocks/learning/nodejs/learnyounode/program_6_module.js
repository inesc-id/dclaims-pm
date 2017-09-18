var fs = require('fs')

module.exports = function(directory,extension, callback){
    fs.readdir(directory,function(err,list){
      if(err) return callback(err)
      let arraySize = list.length;
      var retArray= new Array()

    for(let i=0; i< arraySize;i++){

      let s = list[i].split('.')
      s_size = s.length
      if(list[i].indexOf('.') > -1) {
        if(s[s_size-1]==extension){
          console.log(list[i])
          retArray.push(list[i])
        }
      }
    }
    callback(null,retArray)

  })
}
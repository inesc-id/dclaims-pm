'use strict'



function all(one,two){
  var original = new Promise(function(fulfill,reject){
    var out = []
    var counter = 0

    function great(value){
      counter++
      return value
    }
    one.then(great).then(function(value){
      out[0]=value
      if(counter==2){
        fulfill(out)
      }
    })
    two.then(great).then(function(value){
      out[1]=value
      if(counter==2){
        fulfill(out)
      }
    })



  }
  )
  return original
}


all(getPromise1(),getPromise2()).then(console.log)
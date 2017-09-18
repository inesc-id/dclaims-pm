var fs = require ('fs')

//"/home/joaosantos/learnnode/1"

fs.readdir(process.argv[2],function(err,list){
  let arraySize = list.length;

  for(let i=0; i< arraySize;i++){

    let s = list[i].split('.')
    s_size = s.length
    if(list[i].indexOf('.') > -1) {
      if(s[s_size-1]==[process.argv[3]]){
        console.log(list[i])
      }

    }


  }
})
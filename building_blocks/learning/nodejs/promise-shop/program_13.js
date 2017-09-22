var HTTP = require("q-io/http")



function getInfoFromId(id){
  return HTTP.read('http://localhost:7001/'+id.toString('utf8'))

}


HTTP.read('http://localhost:7000').then(getInfoFromId).then(function(buffer){
  console.log(JSON.parse(buffer))
})
  .then(null,console.error).done()
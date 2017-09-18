var net = require('net')
var server = net.createServer(function(socket){

  getDate(function(date){
    socket.end(date+"\n")

  })

})
server.listen(parseInt(process.argv[2]))



function getDate(callback){
  let date = new Date()
  let min = normalize(date.getMinutes())
  let hour = normalize(date.getHours())
  let day = normalize(date.getDate())
  let month = normalize(1+date.getMonth())
  let year = normalize(date.getFullYear())

  //console.log(year+"-"+month+"-"+day+" "+hour+":"+min)
  callback(year+"-"+month+"-"+day+" "+hour+":"+min)
}

function normalize(number){
  if (number < 10){
    return "0"+number.toString()
  }
  else return number.toString()
}

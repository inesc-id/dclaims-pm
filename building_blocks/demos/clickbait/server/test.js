var storage = require('node-persist')

function addItem (key, item) {
  return new Promise(function (resolve, reject) {
    storage.init().then(function () {
      storage.setItem(key, item).then(function (value) {
        resolve([key, value])
      })
    })
  })
}

function getItem (key) {
  return new Promise(function (resolve, reject) {
    storage.init().then(function () {
      storage.getItem(key).then(function (value) {
        resolve([key, value])
      })
    })
  })
}

function handleVerification (nkey, newClaim) {
  return new Promise(function (resolve, reject) {
    var newClaimArray = []
    newClaimArray.push(newClaim)

    getItem(nkey).then(value => {
      var newClaimsList
      if (value[1]) {
        console.log('Appending...')
        newClaimsList = value[1].concat(newClaimArray)
      } else {
        console.log('Creating new list')
        newClaimsList = newClaimArray
      }
      return addItem(value[0], newClaimsList)
    }).then(value => {
      console.log('Sucess \n' + value)
      resolve('Sucess :)')
    })
  })
}

function getClaimsJSONByUrl (url) {
  return new Promise(function (resolve, reject) {
    getItem(url).then(value => {
      var claimsJSON = {}
      claimsJSON.claimsList = value
      resolve(claimsJSON)
    })
  })
}

function getClaimsCountsJSONByUrl (url) {
  return new Promise(function (resolve, reject) {
    getItem(url).then(values => {
      if (values[1]) {
        resolve(values[1].length)
      } else {
        resolve('0')
      }
    })
  })
}

/*
getClaimsJSONByUrl("http://turbina.gsd.inesc-id.pt:8095/post.html").then(value=>{

    cleanList = value["claimsList"][1]
    console.log(cleanList.length)

    for(let i=0;i<cleanList.length;i++){
        //console.log(cleanList[i])
        console.log("-----CLAIM #"+i+"-----")
        console.log("Text: \n"+cleanList[i]["claim"])
        console.log("User: "+cleanList[i]["ip"])
    }
})
*/

var array1 = []
var newClaim = []

var vc = {claim: 'fake',
  url: 'jn1',
  ip: '192.168'}

var vc2 = {claim: 'faked',
  url: 'jn2',
  ip: '192.16dd8'}

var vc3 = {claim: 'CC',
  url: 'CC',
  ip: 'CC'}

array1.push(vc)
array1.push(vc2)

newClaim.push(vc3)

var nkey = 'http://turbina.gsd.inesc-id.pt:8095/post.html'

handleVerification(nkey, vc).then(console.log).catch((err) => {
  console.log(err)
})

/*

//addItem("2",array).then(console.log)
getItem("2").then(function (value) {
    value.push("hello")

    return value
}).then(value=>{
    return addItem("3",value)
}).then(console.log)

array.push(vc)
array.push(vc2)

console.log(array)

storage.setItemSync("array",array)

var newarray = storage.getItemSync("array")

newarray.push("hello")

console.log(newarray)

    */

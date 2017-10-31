var storage = require('node-persist')

function addItem (key, item) {
  return new Promise(function (resolve, reject) {
    storage.init().then(function () {
      storage.setItem(key, item).then(function (value) {
        if (value) {
          resolve([key, value])
        } else {
          resolve(null)
        }
      })
    })
  })
}

function getItem (key) {
  return new Promise(function (resolve, reject) {
    storage.init().then(function () {
      storage.getItem(key).then(function (value) {
        if (value) {
          resolve([key, value])
        } else {
          resolve(null)
        }
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
      if (value) {
        console.log('Appending...')
        newClaimsList = value[1].concat(newClaimArray)
      } else {
        console.log('Creating new list')
        newClaimsList = newClaimArray
      }
      return addItem(nkey, newClaimsList)
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
      if (values) {
        resolve(values[1].length)
                // resolve("3")
      } else {
        resolve('0')
      }
    })
  })
}

var appRouter = function (app) {
  app.get('/getclaims', function (req, res) {
    var reqURL = req.query.article

    getClaimsJSONByUrl(reqURL).then(value => {
      res.end(JSON.stringify(value))
    }).catch((err) => {
      console.log(err)
    })
  })

  app.get('/getcount', function (req, res) {
    var reqURL = req.query.article

    console.log(reqURL)

    getClaimsCountsJSONByUrl(reqURL).then(value => {
      console.log(value)
      res.end(value.toString())
    }).catch((err) => {
      console.log(err)
    })
  })

    // ex: http://146.193.41.153:8092/verify?claim=veryfake&article=jn_99
  app.get('/verify', function (req, res) {
    var reqField = req.query.claim
    var reqURL = req.query.article
    var reqIP = req.ip

    var vc = {claim: reqField,
      url: reqURL,
      ip: reqIP}

    handleVerification(reqURL, vc)
            .then(value => {
              res.send(value)
            }).catch((err) => {
              console.log(err)
            })
  })
}
module.exports = appRouter

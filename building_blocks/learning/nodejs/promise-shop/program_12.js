var HTTP = require("q-io/http")

HTTP.read('http://localhost:1337').then(JSON.parse).then(console.log)
.then(null,console.error).done()
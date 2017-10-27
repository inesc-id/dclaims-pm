var storage = require('node-persist')


storage.initSync()
var keys = storage.keys()

console.log("Listing all items... \n . \n . \n . \n")

for (var i = 0, len = keys.length; i < len; i++) {
    let currKey = keys[i]
    console.log("Key: "+currKey)
    console.log(storage.valuesWithKeyMatch(currKey))
}
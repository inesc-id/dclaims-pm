
var concat = require('concat-stream')
var reverse = require('reverse-string')


process.stdin.pipe(concat(function(input){
  var reversed = reverse(input.toString())
  console.log(reversed)



}))
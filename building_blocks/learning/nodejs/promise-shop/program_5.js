'use strict'
require('es6-promise');

var promise1 = Promise.reject(new Error('ups...'))

promise1.catch(function(err){
  console.log(err.message)
})

var promise2 = Promise.resolve("hurray")

promise2.then(console.log)
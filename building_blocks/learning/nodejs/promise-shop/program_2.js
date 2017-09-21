'use strict'
require('es6-promise');


var promise = new Promise(function(fulfil,reject){
  setTimeout(function(){ fulfil('FULFILLED!')}, 300);
})

promise.then(console.log)


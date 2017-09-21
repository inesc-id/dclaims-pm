'use strict'
require('es6-promise');


var originalPromise = first()

function onFulfilled(theOne){
  console.log(theOne)
}

originalPromise.then(second).then(onFulfilled)
'use strict'
require('es6-promise');

function attachTitle(name){
  return 'DR. '+name
}

var promise = Promise.resolve('MANHATTAN')

promise.then(attachTitle).then(console.log)
'use strict'
require('es6-promise');


var promise = new Promise(function(fulfil,reject){
  setTimeout(function(){ reject(new Error('REJECTED!'))}, 300);
})

function onReject(error){
  console.log(error.message)
}

function onSucess(){

}

promise.then(onSucess,onReject)


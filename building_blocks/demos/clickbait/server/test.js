var storage = require('node-persist')



function addItem(key,item){
    return new Promise(function(fulfill,reject){
        storage.init().then(function(){
            storage.setItem(key,item).then(function(value){
                fulfill([key,value])
            })
        })
    })
}

function getItem(key) {
    return new Promise(function(fulfill,reject){
        storage.init().then(function(){
            storage.getItem(key).then(function(value){
                fulfill([key,value])
            })
        })
    })
}

function handleVerification(nkey,newClaim){
    // CONVERT VC TO ARRAY!
    getItem(nkey).then(value=>{
        var newClaimsList
        if(value[1]){
        console.log("Appending...")
        newClaimsList = value[1].concat(newClaim)

    }else{
        console.log("Creating new list")
        newClaimsList = newClaim
    }
    return addItem(value[0],newClaimsList)
}).then(value=>{
        console.log("Sucess \n"+value)
})
}


function handleVerification2(nkey,newClaim){
    return new Promise(function(fulfill,reject){
        getItem(nkey).then(value=>{
            var newClaimsList
            if(value[1]){
            console.log("Appending...")
            newClaimsList = value[1].concat(newClaim)

        }else{
            console.log("Creating new list")
            newClaimsList = newClaim
        }
        return addItem(value[0],newClaimsList)
    }).then(value=>{
            console.log("Sucess \n"+value)
            fulfill("Sucess :)")
    })
    })

}



storage.initSync()

var a = storage.getItemSync("37")

var b = new Array



console.log(a)




/*

var array1 = new Array
var newClaim = new Array


var vc = {claim:"fake",
    url: "jn1",
    ip: "192.168"}

var vc2 = {claim:"faked",
    url: "jn2",
    ip: "192.16dd8"}

var vc3 = {claim:"CC",
    url: "CC",
    ip: "CC"}

array1.push(vc)
array1.push(vc2)

newClaim.push(vc3)

var nkey = "37"

handleVerification2(nkey,vc).then(console.log)


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
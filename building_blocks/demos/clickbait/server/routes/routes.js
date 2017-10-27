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


var appRouter = function(app) {

    app.get('/verify', function(req,res){
        var req_field = req.query.claim
        var req_url = req.query.article
        var req_ip = req.ip
        

        var vc = {claim:req_field,
                  url: req_url,
                  ip: req_ip}

        
        handleVerification(req_url,vc)
            .then(value=>{
            res.send(value)
        })



    })
}
module.exports = appRouter;






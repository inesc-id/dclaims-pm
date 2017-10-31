var storage = require('node-persist')


function addItem(key,item){
    return new Promise(function(fulfill,reject){
        storage.init().then(function(){
            storage.setItem(key,item).then(function(value){
                if(value){
                    fulfill([key,value])    
                }
                else{
                    fulfill(null)
                }

            })
        })
    })
}

function getItem(key) {
    return new Promise(function(fulfill,reject){
        storage.init().then(function(){
            storage.getItem(key).then(function(value){
                if(value){
                    fulfill([key,value])
                }
                else{
                    fulfill(null)
                }

            })
        })
    })
}

function handleVerification(nkey,newClaim){
    return new Promise(function(fulfill,reject){
        var newClaimArray = []
        newClaimArray.push(newClaim)

        getItem(nkey).then(value=>{
            var newClaimsList
            if(value){
            console.log("Appending...")
            newClaimsList = value[1].concat(newClaimArray)

        }else{
            console.log("Creating new list")
            newClaimsList = newClaimArray
        }
        return addItem(nkey,newClaimsList)
    }).then(value=>{
            console.log("Sucess \n"+value)
        fulfill("Sucess :)")
    })
    })
}

function getClaimsJSONByUrl(url){
    return new Promise(function(fulfill,reject){
        getItem(url).then(value=>{
            var claimsJSON = {}
            claimsJSON.claimsList = value
        fulfill(claimsJSON)

    })
    })
}

function getClaimsCountsJSONByUrl(url){
    return new Promise(function(fulfill,reject){
        getItem(url).then(values=>{
            if(values){
                fulfill(values[1].length)
                //fulfill("3")
            }
            else{
                fulfill("0")
    }

    })
    })
}


var appRouter = function(app) {

    app.get('/getclaims',function(req,res){
        var req_url = req.query.article

        getClaimsJSONByUrl(req_url).then(value=>{
            res.end(JSON.stringify(value))
        }).catch((err) => {
            console.log(err)
        })
    })

    app.get('/getcount',function(req,res){
        var req_url = req.query.article

        console.log(req_url)

        getClaimsCountsJSONByUrl(req_url).then(value=>{
            console.log(value)
        res.end(value.toString())
    }).catch((err) => {
            console.log(err)
    })



    })

    //ex: http://146.193.41.153:8092/verify?claim=veryfake&article=jn_99
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
    }).catch((err) => {
            console.log(err)
    })
    })
}
module.exports = appRouter;






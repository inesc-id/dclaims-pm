var storage = require('node-persist')




function getClaimsList(url){
    return new Promise(function(fulfill,reject){
        storage.init().then(function(){
            storage.getItem(url).then(function(article){
                if(article) {
                    fulfill(article)
                }
                else{
                    fulfill(false)
                }
            })
        })
    })


}

function appendToClaimsList(claimsList, newClaim, key){
    return new Promise(function(fulfill,reject){
        claimsList.push(newClaim);

        storage.init( ).then(function() {
            storage.setItem(key,claimsList)
                .then(function() {
                    console.log("[sucess] added to existing list")
                    fulfill("[sucess] added to existing list")
                })

        });

    })

}

function createNewClaimsList(newClaim, key){
    return new Promise(function(fulfill,reject){
        console.log("here ")
        storage.init().then(function() {
            console.log("cena ")
            var list = new Array
            list.push(newClaim)

            storage.setItem(key,list, function(){
                console.log("[success] created new list")
                fulfill("[success] created new list")
            })

        })
    })
}



var appRouter = function(app) {

    app.get('/verify', function(req,res){
        var req_field = req.query.claim
        var req_url = req.query.article
        var req_ip = req.ip

        storage.clearSync()

        var coolPromise = null

        var vc = {claim:req_field,
                  url: req_url,
                  ip: req_ip}

        //createNewClaimsList(vc,req_url).then(console.log,console.error).then(res.send("sucess"))
        getClaimsList(req_url).then(function(value){
            appendToClaimsList(value,vc,req_url)
        }).then(console.log)



       /* storage.init( ).then(function() {
            //then start using it
            storage.setItem(req_url,vc)
                .then(function() {

                    return storage.getItem(req_url)
                })
                .then(function(value) {

                    console.log(value); // yourname
                    res.send("Claim < "+req_field+" > From < "+req_ip+" >"+" in <"+req_url+" >")
                })
        });*/



    })
}
module.exports = appRouter;






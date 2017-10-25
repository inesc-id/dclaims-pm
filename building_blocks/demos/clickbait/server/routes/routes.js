var storage = require('node-persist');
var arraylist = require('arraylist')


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
        claimsList.add(newClaim);

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

        storage.init( ).then(function() {
            var list = new ArrayList()
            list.add(vc)
            console.log("cena "+list)
            storage.setItem(key,list)
                .then(function() {
                    console.log("[success] created new list")
                    fulfill("[success] created new list")
                })
        });
    })
}

var appRouter = function(app) {

    app.get('/verify', function(req,res){
        var req_field = req.query.claim
        var req_url = req.query.article
        var req_ip = req.ip

        var coolPromise = null

        var vc = {claim:req_field,
                  url: req_url,
                  ip: req_ip}

        getClaimsList(req_url).then(function(value){
            if(value){
                appendToClaimsList(value,vc,req_url)
            }else{
                console.log("not here... Adding...")
                createNewClaimsList(vc,req_url)

            }
        }).then(function(value){
            res.send("All good.")
        })

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






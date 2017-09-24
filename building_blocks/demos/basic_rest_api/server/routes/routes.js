var fs = require("fs");
var ipfsAPI = require('ipfs-api')
var bl = require('bl')
var Promise = require('promise')
var json = JSON.parse(fs.readFileSync('files/sample_cert.json', 'utf8'));
const mock_ethereum_path = "files/mock_ethereum.json"



var revocationStatus = true;

// Configure your go-IPFS API Gateway
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})


function promiseVerifySignatures(files_array){
  var cert_rules = JSON.parse(files_array[0])
  var cert_proofs = JSON.parse(files_array[1])

  return new Promise(function(fulfill,reject){
    cert_rules["revocation_rules"].forEach(function(element){
      if(! cert_proofs["proofs"].includes(element)){
        revocationStatus = false;
      }
    })
    fulfill(revocationStatus)
  })

}

function verifySignatures(cert_rules, cert_proofs){

  cert_rules["revocation_rules"].forEach(function(element){
    //console.log(element);
    if(! cert_proofs["proofs"].includes(element)){
      revocationStatus = false;
    }
  });
  return revocationStatus;
}



function getMockEthereum(cert_raw){
  return new Promise(function( fulfill,reject){
    fs.readFile(mock_ethereum_path,'utf8',function(err,data){
      if (err){
        throw err
      }
      console.log("GOT JSON!!: "+JSON.parse(data)["current_proofs_link"])
      fulfill([cert_raw,data])
    })
  })
}


function getRulesProofs(data){
  var cert = JSON.parse(data[0].toString())
  var rules_link = cert['document']['verify']['ipfs_files']['rules']
  var proofs_link = JSON.parse(data[1])[["current_proofs_link"]]

  var rules_promise = getIPFSCert(rules_link)
  var proofs_promise = getIPFSCert(proofs_link)

  return new Promise.all([rules_promise,proofs_promise])

}

function getIPFSCert(multihash){
  return new Promise(function(fulfill,reject){
    ipfs.files.cat(multihash,function (err,file) {
      console.log("Fetching... "+multihash)
      file.pipe(bl(function(err,data){
        fulfill(data.toString())

      }));
    })
  })
}

var appRouter = function(app) {

  app.get('/verifycert',function(req,res){
    if (req.method == 'GET'){
      var cert= req.query.ipfsAddr
        getMockEthereum(cert)
        .then(getRulesProofs)
        .then(promiseVerifySignatures)
        .then(function(result){
          if (result){
            console.log("trueeee")
            res.end("The certificate is REVOKED")
          }
          if (!result){
            res.end("The certificate is NOT REVOKED")
          }
        }).then(null,function(err){
        console.log(err.message)
        res.end("Something went wrong...")
      })
    }
  })

  app.get('/verify',function(req,res){
    if (req.method == 'GET'){
      var ipfs_addr= req.query.ipfsAddr
      getIPFSCert(ipfs_addr)
        .then(getMockEthereum)
        .then(getRulesProofs)
        .then(promiseVerifySignatures)
        .then(function(result){
          if (result){
            console.log("trueeee")
            res.end("The certificate is REVOKED")
          }
          if (!result){
            res.end("The certificate is NOT REVOKED")
          }
        }).then(null,function(err){
          console.log(err.message)
          res.end("Something went wrong...")
      })
    }
  })
}
module.exports = appRouter;

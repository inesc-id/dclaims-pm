var fs = require("fs");
var ipfsAPI = require('ipfs-api')
var bl = require('bl')
var Promise = require('promise')
var json = JSON.parse(fs.readFileSync('files/sample_cert.json', 'utf8'));
const files_path = "files/"
const mock_ethereum_file_name ="mock_ethereum.json"
const mock_ethereum_path = files_path+mock_ethereum_file_name

const mock_issuer_proof = "issuer_key"
const mock_receiver_proof = "receiver_key"



var revocationStatus = true;

// Configure your go-IPFS API Gateway
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})



function getMockEthereum(){
  return new Promise(function( fulfill,reject){
    fs.readFile(mock_ethereum_path,'utf8',function(err,data){
      if (err){
        throw err
      }
      console.log("GOT JSON!!: "+JSON.parse(data)["current_proofs_link"])
      fulfill(data)
    })
  })
}

function issueRevocationProof(doc,revokingParty){
  return new Promise(function(fulfill,reject){
    var revoker
    console.log("dkdkd")
    console.log(doc + revokingParty)
    if(revokingParty=='issuer'){
      revoker = mock_issuer_proof

    }

    else if(revokingParty=='receiver'){
      revoker = mock_receiver_proof

    }

    else{

      reject("Invalid revoking party.")


    }

    verifyProofsExists(doc, revoker).then(function(results){
      if(!results[0]){
        console.log("Proof already there. Nothing to do here. *Flies away*")
        fulfill('Proof already there. Nothing added')
      }
      else{
        console.log("Proof not here yet.")
        generateNewProofsFile(results[1]).then(addNewProofsToIPFS).then(updateMockEthereum)
        // NOW JUST CHANGE THE FILENAME!
      }
    })

  })
}

function verifyProofsExists(mockEthereum, revoking_party_proof){
  return new Promise(function(fulfill,reject){
    var json_file = JSON.parse(mockEthereum)

    getIPFSCert(json_file["current_proofs_link"])
      .then(function(file){
        var jsonfile = JSON.parse(file)

        if(jsonfile["proofs"].includes(revoking_party_proof)){
          console.log("Proof already there")
          fulfill([false,null])
        }
        else{
          jsonfile["proofs"].push(revoking_party_proof)
          console.log("Proof added. New list: "+JSON.stringify(jsonfile))
          fulfill([true,jsonfile])
        }
      })
  })

}

function generateNewProofsFile(contents){
  return new Promise(function(fulfill,reject){
    fs.writeFile(files_path+"current_proofs.json",JSON.stringify(contents),'utf8',function(err){
      if(err){
        reject("error writing to file...")
      }
      else{
        console.log("Generating new proof...")
        fulfill("Mock Ethereum has been updated..")
      }
    })
  })
}

function updateMockEthereum(multihash){
  return new Promise(function(fulfill,reject){
    let mock_ethereum =  {current_proofs_link:multihash}

    let json_mockEthereum = JSON.stringify(mock_ethereum)
    let backToObject = JSON.parse(json_mockEthereum)

    console.log("Generating new Mock Ethereum... \n "+backToObject["current_proofs_link"])

    /*fs.writeFile(files_path+"current_proofs.json",JSON.stringify(contents),'utf8',function(err){
      if(err){
        reject("error writing to file...")
      }
      else{
        console.log("Generating new proof...")
        fulfill("Mock Ethereum has been updated..")
      }
    })*/
  })
}

function addNewProofsToIPFS(){
  return new Promise(function(fulfill,reject){
    ipfs.files.add([
      {
        path: mock_ethereum_file_name,
        content: fs.createReadStream(mock_ethereum_path)
      }
    ],function(err,result){
      if(err){
        reject("something went wrong adding the file")
        console.log("pupu")
      }
      else{
        console.log("added_to_ipfs")
        console.log(result[0].hash)
        fulfill(result[0].hash)
      }
    })
  })
}


var appRouter = function(app) {

  app.get('/revoke', function(req,res){
    var revokingParty = req.query.revokingparty

    getMockEthereum()
      .then(data=>issueRevocationProof(data,revokingParty))
    res.send("yey")

  })
}
module.exports = appRouter;

/*
*   ______ ______ ______ ______ ______ ______ ______
  _|______|______|______|______|______|______|______|_
 | |    /\   | | |  / ____| |                       | |
 | |   /  \  | | | | |    | | ___  __ _ _ __        | |
 | |  / /\ \ | | | | |    | |/ _ \/ _` | '__|       | |
 | | / ____ \| | | | |____| |  __/ (_| | |          | |
 | |/_/    \_\_|_|  \_____|_|\___|\__,_|_|          | |
 | |______ ______ ______ ______ ______ ______ ______| |
 |_|______|______|______|______|______|______|______|_|

* */



















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






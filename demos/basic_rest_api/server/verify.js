var fs = require("fs");
var cert_file = JSON.parse(fs.readFileSync('files/sample_cert.json', 'utf8'));
var cert_rules = JSON.parse(fs.readFileSync('files/cert_test_rules_ipfs.json', 'utf8'));
var cert_proofs = JSON.parse(fs.readFileSync('files/cert_test_proofs_ipfs.json', 'utf8'));
var revocationStatus = true;

console.log(cert_rules["revocation_rules"]);

function verifySignatures(cert_rules, cert_proofs){

    cert_rules["revocation_rules"].forEach(function(element){
        //console.log(element);
        if(! cert_proofs["proofs"].includes(element)){
            revocationStatus = false;
        }
        else{
            revocationStatus = false;
        }

    });
}

verifySignatures(cert_rules,cert_proofs);
console.log("result: "+revocationStatus);
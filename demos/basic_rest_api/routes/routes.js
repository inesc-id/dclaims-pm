var fs = require("fs");
var json = JSON.parse(fs.readFileSync('files/sample_cert.json', 'utf8'));

var cert_rules = JSON.parse(fs.readFileSync('files/cert_test_rules_ipfs.json', 'utf8'));
var cert_proofs = JSON.parse(fs.readFileSync('files/cert_test_proofs_ipfs.json', 'utf8'));
var revocationStatus = true;

function verifySignatures(cert_rules, cert_proofs){

    cert_rules["revocation_rules"].forEach(function(element){
        //console.log(element);
        if(! cert_proofs["proofs"].includes(element)){
            revocationStatus = false;
        }
    });
    return revocationStatus;
}

function mockGetProofsFile(ipfs_proofs_link){return cert_proofs}

function mockGetRulesFile(ipfs_rules_link){return cert_rules}

var appRouter = function(app) {
	app.get("/test1", function(req, res) {
        res.send(json);
    });
    

    app.post('/', function(request, response){
        console.log(request.body);      // your JSON
        
        var cert_proofs_link = request.body["document"]["verify"]["ipfs_files"]["proofs"];
        var cert_rules_link = request.body["document"]["verify"]["ipfs_files"]["rules"];

        var cert_proofs_file = mockGetProofsFile(cert_proofs_link);
        var cert_rules_file= mockGetRulesFile(cert_rules_link);
        
        response.send(verifySignatures(cert_rules_file,cert_proofs_file));    // echo the result back
    });

}

module.exports = appRouter;

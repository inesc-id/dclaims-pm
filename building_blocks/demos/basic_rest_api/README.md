# Hypercerts Revocation Demo

## Demo
[![screen shot 2017-09-24 at 13 00 37](https://user-images.githubusercontent.com/10178757/30782356-aaf396f4-a128-11e7-9047-12b381a9d18a.jpg)](https://youtu.be/W9C-g_a22wM)

## Instructions
**Server**

1. [Install go-ipfs on your server.](https://ipfs.io/docs/install/)
2. Install [NPM](https://www.npmjs.com/get-npm)
3. Install node by running `npm install npm@latest -g`
4. Start the IPFS daemon by running `ipfs daemon`. Be sure to check the [ipfs-js-api documentation](https://github.com/ipfs/js-ipfs-api) to check if you are running IPFS on the correct port and have the API gateway configured.
3. On a separate terminal window, go to `server` and run `npm install`
4. Start the server by running `node app.js`

**Client**
1. In `client/playground/index.html`, configure the correct server address and port in line `var serverAddress = "http://146.193.41.153:8091"`
1. The client can run in any browser. Navigate to `client/playground/` and run `sh start.sh`
2. Go to [http://localhost:8084](http://localhost:8084) to test.
### Revoke a Certificate
Revocation via a web application is **not** implemented as of yet. One can, however, simulate it when in control of the server.

**To revoke**
1. Go to `server/files/test_files/ipfs_links.txt` and copy the IPFS link of the revoked certificate. In this demo, that link is `QmSATsagbfxgvTPykdsMbs9STDpivs6v3nu37RnF5RkyZA`
2. Paste the link in `server/files/mock_ethereum.json`. The file should look like this: 
`{"current_proofs_link":"QmSATsagbfxgvTPykdsMbs9STDpivs6v3nu37RnF5RkyZA"}`

3. Restart the node server.

**To unrevoke**
1. Same steps as to revoke but in the `mock_ethereum.json` use the unrevoked IPFS link from `server/files/test_files/ipfs_links.txt`

Quick overview on how revocation works:

Revocation verification is performed by verifying if the required revocation proofs for a given certificate have been issued.
In `server/files/test_files` there are two proofs files. One, `revoked.proofs.json` consists on a set of proofs sufficient to consider a certificate to be revoked while the other, `non_revoked_proofs.json` does not. Both these files have been added to IPFS and their links are available in the `ipfs_links.txt`

The way the verification application works will work is by contacting en Ethereum smart-contract that will have the link for the latest revocation proofs file. In this demo the Ethereum smart-contract is simulated by the file `server/files/mock_ethereum.json` which contains the ipfs link to a proofs file. This is the default content of that file:

`{"current_proofs_link":"QmSATsagbfxgvTPykdsMbs9STDpivs6v3nu37RnF5RkyZA"}`

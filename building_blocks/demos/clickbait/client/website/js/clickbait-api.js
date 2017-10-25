document.getElementById('jsonid2').style.width="800px";
var serverAddress = "http://146.193.41.153:8091"
function sendMessage(name){
    var jsonfile = jQuery.parseJSON(name);
    var data = JSON.stringify(jsonfile);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText);
        }
    });

    xhr.open("GET", serverAddress+"/verifycert?ipfsAddr="+data);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);
}

function sendGetMessage(name){
    var data = null;


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText);
        }
    });
//application/javascript
    xhr.open("GET", serverAddress+"/verify?ipfsAddr="+name);
    xhr.setRequestHeader("content-type", "application/javascript");

    //xhr.setRequestHeader("postman-token", "9478c587-f2da-2c03-fe1a-5747306ae18f");

    xhr.send(data);
}
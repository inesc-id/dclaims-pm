//document.getElementById('jsonid2').style.width="800px";

function sendMessage_old(name){
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

function sendMessage(name){
    var data = null;


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText);
            console.log(this.response)
        }
    });
//application/javascript
    //http://146.193.41.153:8092/verify?claim=veryfake&article=jn_99
    var claim = name
    var article_url = window.location.href
    var serverAddress = "http://turbina.gsd.inesc-id.pt:8092"

    var request = serverAddress+"/verify?claim="+claim+"&article="+article_url

    console.log("REQUEST::::::     "+request)

    xhr.open("GET", request);
    xhr.setRequestHeader("content-type", "application/javascript");

    //xhr.setRequestHeader("postman-token", "9478c587-f2da-2c03-fe1a-5747306ae18f");

    xhr.send(data);
}
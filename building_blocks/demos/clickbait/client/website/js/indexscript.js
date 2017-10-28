console.log("Helloooo")

function setBadgeCount(badgeId){
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var number = this.response.toString()
            console.log("Server response:    "+number)
            document.getElementById(badgeId).innerHTML = number
        }
    });
    var url = badgeId.substr(6)
    var request = "http://146.193.41.153:8092/getcount?article="+url

    xhr.open("GET", request);
    xhr.setRequestHeader("content-type", "application/javascript");
    xhr.send(data);
}


function setAllBadges(){
    var list= document.getElementsByClassName("clickbaitnotification");
    for (var i = 0; i < list.length; i++) {
        console.log(list[i].id); //second console output
        setBadgeCount(list[i].id)
    }
}

setAllBadges()




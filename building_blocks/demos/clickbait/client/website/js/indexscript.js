console.log("Helloooo")


function clickClaims(){
    console.log("Opened claims")
    document.getElementById("claim-post-body").innerHTML="There are no claims about this article's title yet. Open the article and be the first!"

    //http://146.193.41.153:8092/getclaims?article=http://turbina.gsd.inesc-id.pt:8095/post.html

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;



    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var claims = JSON.parse(this.response)

            cleanList = claims["claimsList"][1]
            console.log(cleanList.length)

            var txt='<div class="container">'

            for(let i=0;i<cleanList.length;i++){
                //console.log(cleanList[i])
                let st1 = "  CLAIM #"+(i+1)
                let st2 ="Text: \n"+cleanList[i]["claim"]
                let st3 = "User: "+cleanList[i]["ip"]

                //txt+= '<div class="row">'
                txt+='<p class="claimtitle">'+st1+'</p>'+'<p class="claimbody">'+st2+'</p>'+'<p class="claimuser">'+st3+'</p>'
                //txt+='</div>'

            }
            txt+='</div>'
            document.getElementById("claim-post-body").innerHTML=txt

        }
    });


    var request = "http://146.193.41.153:8092/getclaims?article=http://turbina.gsd.inesc-id.pt:8095/post.html"

    xhr.open("GET", request);
    xhr.setRequestHeader("content-type", "application/javascript");
    xhr.send(data);


}

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




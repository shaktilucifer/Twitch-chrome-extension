document.addEventListener('DOMContentLoaded', func);

function init(){
    var elem = document.getElementById('Add');
    elem.addEventListener('click',func);
}
function func(){
var display_name={};
var stream_status={};
var stream_url={};
var res={};
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitch.tv/kraken/search/streams?q=league%20of%20legends&limit=30", true);
  xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
      // innerText does not let the attacker inject HTML elements.
          var qtpie=JSON.parse(xhr.responseText);
          for(i=0;i<30;i++){
           display_name[i] = JSON.stringify(qtpie.streams[i].channel.display_name);
           stream_status[i] = JSON.stringify(qtpie.streams[i].channel.status);
           stream_url[i]=JSON.stringify(qtpie.streams[i].channel.url);
           j=i+1;
           res[i] = j+")."+display_name[i]+" : "+stream_status[i]+"\n";
        //  console.log(stream_url[i]);
          stream_url[i] = stream_url[i].replace(/^"(.+(?="$))"$/, '$1');
          var a = document.createElement('a');
          var linkText = document.createTextNode(res[i]);
          a.appendChild(linkText);
          a.setAttribute('id',"a"+i);
          a.setAttribute('href', stream_url[i]);
          document.getElementById("status").appendChild(a);
             
        }
      var magic=activateLinks();
      //document.getElementById("status").innerText = res;
    }
  }
  xhr.send();

}
function activateLinks()
{
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
      (function () {
          var ln = links[i];
          var location = ln.href;
          ln.onclick = function () {
              chrome.tabs.create({url: location});
          };
      })();
  }
}

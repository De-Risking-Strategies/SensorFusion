//Sensor Fusion Utility functions
var elem = document.documentElement;
function timeRefresh(time) {
      setTimeout("location.reload(true);", time);
}
/* View in fullscreen */
function openFullscreen() {
  var openFullScreen = document.getElementById("open_fullscreen");
  var closeFullScreen = document.getElementById("close_fullscreen");
 
  openFullScreen.style.display = "none";
  closeFullScreen.style.display = "block";
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /*  IE11 */
    elem.msRequestFullscreen();
  }
  
}

/* Close fullscreen */
function closeFullscreen() {
  var openFullScreen = document.getElementById("open_fullscreen");
  var closeFullScreen = document.getElementById("close_fullscreen");
 
  openFullScreen.style.display = "block";
  closeFullScreen.style.display = "none";
  
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  
}

function notImplementedYet(){
  alert("Not Yet Implemented");
}

function setCookie(cname,cvalue,exdays){
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = 'expires'+ d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

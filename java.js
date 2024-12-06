var bool_isFullscreen = false;

//# access DIV that is container for [ video + button image ].
var myVideoGIF = document.getElementById("myVideo");

//# access DIV that is a click "hotspot" to enter fullscreen.
var myBtn_FS = document.getElementById("showVideoButton");

//# access IMG for button that will change mode to fullscreen.
//var img_myBtn_FS; //# = document.getElementById("img_btn_fs");

myBtn_FS.addEventListener('click', function(){
    document.getElementById('myVideo').style.display = "flex";
})

window.addEventListener('fullscreenchange', on_FS_Change, false);

function on_FS_Change(evt) {
  //######################################
  //# detect event for screen mode change
  //#is "null" when page/element is not in Fullscreen
if (document.fullscreenElement != null) {
    bool_isFullscreen = true;
}

  //# assume is already in Fullscreen mode
else {
    bool_isFullscreen = false;
    exit_FullScreen();
}

}

function go_FullScreen(input) {
  //# NOTE : child elements are in order of appearance in setup
  //# Parent == DIV as container
    children[0] == VIDEO; 
    children[1] == DIV;




  //##############################################################
  //## Get access to the specific clicked item's Parent (container)
myVideoGIF = document.getElementById(input.parentNode.id);
myBtn_FS = myVideoGIF.children[1];



  //########################################
  //## Check if screen mode is : Fullscreen
  //## If already Fullscreen then just do the "on exit fullscreen" code 
  //## then quit (RETURN) from this function (ignores rest of code below)
if (bool_isFullscreen == true) {
    exit_FullScreen(); //# handle on exit fullscreen
    return; //# quit/exit code here...
}

  //##############################################################
  //## Will continue onto code below if NOT Fullscreen (no return)

function openFullscreen(elem) {
if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
}
} 

openFullscreen(myVideoGIF);

myVideoGIF.children[0].style.width = "100%"
myVideoGIF.children[0].style.height = "100%"
myVideoGIF.children[0].style.background = "transparent"

  //# set to true (helps "exit_FullScreen" function )
bool_isFullscreen = true;

}

function exit_FullScreen() {


if (bool_isFullscreen == true) {
    bool_isFullscreen = false;

    //#########################################
    //# check IF browser can use this method...
    if (document.exitFullscreen) {
    document.exitFullscreen()
        .then(() => console.log("Document Exited from Full screen mode"))
        .catch((err) => console.error(err));

    myVideoGIF.children[0].style.background = "none"

    }

    //## OR ELSE try other browser options

    /* for Safari */
    else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    }

    /* for IE11 */
    else if (document.msExitFullscreen) {
    document.msExitFullscreen();
    }
}

}
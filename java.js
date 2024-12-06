const button = document.getElementById("showVideoButton");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("myVideo");

let checkFullscreenInterval;

// Funzione per entrare in modalità schermo intero
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Funzione per verificare se siamo in fullscreen
function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

// Mostra il video e avvia in modalità schermo intero
button.addEventListener("click", () => {
    videoContainer.style.display = "block";
    video.play();
    enterFullscreen(video);

    checkFullscreenInterval = setInterval(() => {
        if (!isFullscreen()) {
            videoContainer.style.display = "none";
            video.pause();
            video.currentTime = 0; 
            clearInterval(checkFullscreenInterval); 
        }
    }, 200); 
});


document.getElementById('myVideo').addEventListener('ended', function () {
    setTimeout(() => {
        window.location.href = "secondo.html"; // Cambia l'URL con quello desiderato
    }, 1000);
});
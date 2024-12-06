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
    videoContainer.style.display = "block"; // Mostra il contenitore del video
    video.play(); // Avvia la riproduzione del video
    enterFullscreen(video); // Entra in modalità fullscreen

    // Controlla costantemente lo stato fullscreen
    checkFullscreenInterval = setInterval(() => {
        if (!isFullscreen()) { // Se esci dal fullscreen
            videoContainer.style.display = "none"; // Nascondi il contenitore del video
            video.pause(); // Metti in pausa il video
            video.currentTime = 0; // Resetta il video
            clearInterval(checkFullscreenInterval); // Ferma il controllo
        }
    }, 200);
});

// Reindirizza l'utente alla fine del video
video.addEventListener('ended', function () {
    setTimeout(() => {
        window.location.href = "secondo.html"; // Cambia l'URL con quello desiderato
    }, 1000); // Aspetta 1 secondo prima di reindirizzare
});

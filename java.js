const button = document.getElementById("showVideoButton");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("myVideo");

// Mostra il video e avvia in modalità schermo intero
button.addEventListener("click", () => {
    video.style.display = "block"; // Rendi visibile il video

    video.pause(); // Reset del video
    video.currentTime = 0; // Torna all'inizio del video
    video.play(); // Avvia il video
    enterFullscreen(video); // Entra in modalità fullscreen

    // Controlla costantemente lo stato fullscreen
    checkFullscreenInterval = setInterval(() => {
        if (!isFullscreen()) { // Se si esce dal fullscreen
            video.pause(); // Metti in pausa il video
            video.currentTime = 0; // Resetta il video
            video.style.display = "none"; // Nascondi il video
            clearInterval(checkFullscreenInterval); // Ferma il controllo
        }
    }, 200);
});

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

// Reindirizza l'utente alla fine del video
video.addEventListener("ended", function () {
    setTimeout(() => {
        video.style.display = "none"; // Nasconde il video al termine
        videoContainer.style.display = "none"; // Nasconde il contenitore
        window.location.href = "secondo.html"; // Cambia l'URL con quello desiderato
    }, 750);
});

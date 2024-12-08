const button = document.getElementById("showVideoButton");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("myVideo");

let checkFullscreenInterval;

// Funzione per entrare in modalità schermo intero
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitEnterFullscreen) { // Safari iOS
        element.webkitEnterFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Funzione per verificare se siamo in fullscreen
function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}

// Mostra il video e avvia in modalità schermo intero
button.addEventListener("click", () => {
    videoContainer.style.display = "block"; // Assicurati che il contenitore sia visibile
    video.style.display = "block";
    video.style.opacity = "1";

    // Azzera il video
    video.pause();
    video.currentTime = 0;

    // Avvia il video
    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                enterFullscreen(video); // Entra in modalità fullscreen solo se il video inizia a riprodursi
            })
            .catch((error) => {
                console.error("Errore durante l'avvio del video:", error);
            });
    }

    // Controlla costantemente lo stato fullscreen
    checkFullscreenInterval = setInterval(() => {
        if (!isFullscreen()) { // Se si esce dal fullscreen
            video.pause(); // Metti in pausa il video
            video.currentTime = 0; // Resetta il video
            video.style.display = "none"; // Nascondi il video
            videoContainer.style.display = "none"; // Nascondi il contenitore
            clearInterval(checkFullscreenInterval); // Ferma il controllo
        }
    }, 200);
});

// Reindirizza l'utente alla fine del video
video.addEventListener("ended", function () {
    setTimeout(() => {
        video.style.display = "none"; // Nasconde il video al termine
        video.style.opacity = "0";
        videoContainer.style.display = "none";
        window.location.href = "secondo.html"; // Cambia l'URL con quello desiderato
    }, 1000);
});

let Button = document.getElementById('showVideoButton');

Button.addEventListener('click', function () {
    setTimeout(() => {  
        const video = document.getElementById('myVideo');
        video.style.display = "flex";

        // Richiama la modalità fullscreen
        if (video.requestFullscreen) {
            video.requestFullscreen(); // Per la maggior parte dei browser
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Per Safari desktop
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Per Firefox
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen(); // Per Internet Explorer/Edge
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen(); // Per Safari iOS
        }
    }, 700);
});

// Nascondi il video quando si esce dal fullscreen
document.addEventListener('fullscreenchange', function () {
    const video = document.getElementById('myVideo');
    if (!document.fullscreenElement) {
        video.style.display = "none";
        video.pause();
        video.currentTime = 0; // Resetta il video
    }
});

// Supporto per eventi fullscreen specifici di Safari
document.addEventListener('webkitfullscreenchange', function () {
    const video = document.getElementById('myVideo');
    if (!document.webkitFullscreenElement) {
        video.style.display = "none";
        video.pause();
        video.currentTime = 0;
    }
});

// Per Safari iOS: rileva quando si esce dalla modalità schermo intero
document.getElementById('myVideo').addEventListener('webkitendfullscreen', function () {
    const video = document.getElementById('myVideo');
    video.style.display = "none";
    video.pause();
    video.currentTime = 0;
});

// Redirect alla fine del video
document.getElementById('myVideo').addEventListener('ended', function () {
    setTimeout(() => {
        window.location.href = "secondo.html"; // Cambia l'URL con quello desiderato
    }, 1000);
});

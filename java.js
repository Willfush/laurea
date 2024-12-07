 const videoContainer = document.getElementById("videoContainer");
 const button = document.getElementById("showVideoButton");
 const video = document.getElementById("myVideo");
 let checkFullscreenInterval;
 // Mostra il video e avvia in modalità schermo intero
 button.addEventListener("click", () => {
     // Mostra il contenitore e il video
     videoContainer.style.display = "block";
     video.style.display = "block";
     video.style.opacity = "1";
     // Ripristina lo stato del video
     video.play(); // Assicurati che il video sia in pausa
     video.currentTime = 0; // Resetta il tempo di riproduzione
     enterFullscreen(video); // Entra in modalità fullscreen
     // Controlla lo stato fullscreen
     checkFullscreenInterval = setInterval(() => {
         if (!isFullscreen()) {
             // Esci dalla modalità fullscreen
             video.pause(); // Metti in pausa il video
             video.currentTime = 0; // Resetta il video
             video.style.display = "none"; // Nascondi il video
             videoContainer.style.display = "none"; // Nascondi il contenitore
             clearInterval(checkFullscreenInterval); // Ferma il controllo
         }
     }, 200);
 });
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
  // Gestisci la fine del video
 video.addEventListener("ended", function () {
     setTimeout(() => {
         window.location.href = "secondo.html"; // Cambia l'URL con quello desiderato
     }, 350);
 });

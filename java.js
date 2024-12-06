let Button = document.getElementById('showVideoButton')

Button.addEventListener('click', function(){
    setTimeout(() => {  
        document.getElementById('myVideo').style.display = "flex";  

        const video = document.getElementById('myVideo')

        if (video.requestFullscreen) {
            video.requestFullscreen(); // Per la maggior parte dei browser
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Per Safari
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Per Firefox
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen(); // Per Internet Explorer/Edge
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen(); // Richiama la modalità schermo intero su iOS
        }
    }, 700);
});

// document.addEventListener('fullscreenchange', function(){
//     const video = document.getElementById('myVideo');

//     if (!document.fullscreenElement) {
//         // Se non siamo più in fullscreen, nascondi il video
//         video.style.display = "none";
//         video.pause();
//         video.currentTime = 0; // Reset del video
//     }
// });

// // Supporto per altri browser
// document.addEventListener('webkitfullscreenchange', function () {
    
//     const video = document.getElementById('myVideo')

//     if (!document.webkitFullscreenElement) {
//         video.style.display = "none";
//         video.pause();
//         video.currentTime = 0;
//     }
// });

// document.addEventListener('webkitfullscreenchange', function () {
    
//     const video = document.getElementById('myVideo')

//     if (!document.webkitDisplayingFullscreen) {
//         video.style.display = "none";
//         video.pause();
//         video.currentTime = 0;
//     }
// });


// document.getElementById('myVideo').addEventListener('ended', function () {
//     setTimeout(() => {
//         window.location.href = "secondo.html"; // Cambia l'URL con quello desiderato
//     }, 1000);
// });
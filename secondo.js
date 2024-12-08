let Button = document.getElementById('button');
let Mun = document.getElementById('serto');
let i = 0;
let startTime = null; // Memorizza il momento in cui inizia il conteggio dei clic
let videoShown = false; // Per evitare che il video venga mostrato più di una volta

Button.addEventListener('click', function () {
    window.location.href = "index.html"; // Reindirizza alla pagina index.html
});

Mun.addEventListener('click', function () {
    if (startTime === null) {
        startTime = Date.now(); // Inizia il conteggio del tempo
    }

    i++; // Incrementa i ogni volta che Mun viene cliccato

    // Controlla se i è uguale a 10
    if (i === 10) {
        // Verifica se sono passati meno di 2 secondi
        if (Date.now() - startTime <= 2000) {
            setTimeout(() => {
                alert('GG');
                showVideo(); // Mostra il video dopo l'alert
            }, 500);
        } else {
            // Se sono passati più di 2 secondi, resetta i
            i = 0;
        }
    }

    // Resetta i dopo 2 secondi dall'ultimo clic
    if (Date.now() - startTime > 2000) {
        i = 0; // Reset di i se sono passati più di 2 secondi
        startTime = null; // Resetta il tempo di inizio
    }
});

// Funzione per mostrare il video
function showVideo() {
    if (!videoShown) {
        videoShown = true; // Assicurati che il video venga mostrato una sola volta

        // Crea un tag video
        let video = document.createElement('video');
        video.id = 'video';
        video.width = 640;
        video.height = 360;
        video.controls = true;

        // Crea una source per il video
        let source = document.createElement('source');
        source.src = 'background.mp4'; 
        source.type = 'video/mp4';

        // Aggiungi la source al video
        video.appendChild(source);

        // Aggiungi il video al corpo del documento
        document.body.appendChild(video);

        // Mostra il video a schermo intero
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Entra in modalità fullscreen dopo che il video inizia
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) { // Safari
                        video.webkitRequestFullscreen();
                    } else if (video.mozRequestFullScreen) { // Firefox
                        video.mozRequestFullScreen();
                    } else if (video.msRequestFullscreen) { // IE/Edge
                        video.msRequestFullscreen();
                    }
                })
                .catch((error) => {
                    console.error("Errore durante l'avvio del video:", error);
                });
        }

        // Controlla costantemente lo stato fullscreen
        const checkFullscreenInterval = setInterval(() => {
            if (!isFullscreen()) {
                // Quando si esce dal fullscreen, ferma e nascondi il video
                video.pause();
                video.currentTime = 0;
                video.style.display = "none";
                clearInterval(checkFullscreenInterval); // Ferma il controllo
                videoShown = false; // Permetti di rivedere il video
            }
        }, 200);
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

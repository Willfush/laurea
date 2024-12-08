let Button = document.getElementById('button');
let Mun = document.getElementById('serto');
let i = 0;
let startTime = null;  // Memorizza il momento in cui inizia il conteggio dei clic
let videoShown = false;  // Per evitare che il video venga mostrato più di una volta
let videoElement = null; // Mantieni un riferimento globale al video

// Funzione per entrare in modalità schermo intero
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari iOS
        element.webkitRequestFullscreen();
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

Button.addEventListener('click', function () {
    window.location.href = "index.html";  // Reindirizza alla pagina index.html
});

Mun.addEventListener('click', function () {
    if (startTime === null) {
        startTime = Date.now();  // Inizia il conteggio del tempo
    }

    i++;  // Incrementa i ogni volta che Mun viene cliccato

    // Controlla se i è uguale a 10
    if (i === 10) {
        // Verifica se sono passati meno di 2 secondi
        if (Date.now() - startTime <= 2000) {
            setTimeout(() => {
                alert('GG');
                showVideo();  // Mostra il video
            }, 500);
        } else {
            // Se sono passati più di 2 secondi, resetta i
            i = 0;
        }
    }

    // Resetta i dopo 2 secondi dall'ultimo clic
    if (Date.now() - startTime > 2000) {
        i = 0;  // Reset di i se sono passati più di 2 secondi
        startTime = null;  // Resetta il tempo di inizio
    }
});

// Funzione per mostrare il video
function showVideo() {
    if (!videoShown) {
        videoShown = true;  // Assicurati che il video venga mostrato una sola volta

        // Crea un elemento video solo se non esiste già
        if (!videoElement) {
            videoElement = document.createElement('video');
            videoElement.id = 'video';
            videoElement.width = 640;
            videoElement.height = 360;
            videoElement.controls = true;

            // Crea una source per il video
            let source = document.createElement('source');
            source.src = 'background.mp4';
            source.type = 'video/mp4';

            // Aggiungi la source al video
            videoElement.appendChild(source);

            // Aggiungi il video al corpo del documento
            document.body.appendChild(videoElement);
        }

        // Assicura che il video sia visibile
        videoElement.style.display = "block";
        videoElement.style.opacity = "1";

        // Riproduci il video
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    enterFullscreen(videoElement); // Entra in modalità fullscreen
                })
                .catch((error) => {
                    console.error("Errore durante l'avvio del video:", error);
                });
        }

        // Controlla costantemente lo stato fullscreen
        const checkFullscreenInterval = setInterval(() => {
            if (!isFullscreen()) {
                videoElement.pause(); // Metti in pausa il video
                videoElement.currentTime = 0; // Resetta il video
                videoElement.style.display = "none"; // Nascondi il video
                clearInterval(checkFullscreenInterval); // Ferma il controllo
                videoShown = false; // Permetti di rivedere il video
            }
        }, 200);
    }
}

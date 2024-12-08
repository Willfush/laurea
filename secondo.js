let Button = document.getElementById('button');
let Mun = document.getElementById('serto');
let i = 0;
let startTime = null;  // Memorizza il momento in cui inizia il conteggio dei clic
let videoShown = false;  // Per evitare che il video venga mostrato più di una volta
let checkFullscreenInterval;

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

// Funzione per verificare se siamo in modalità fullscreen
function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}

// Funzione per mostrare il video
function showVideo() {
    if (!videoShown) {
        videoShown = true;  // Assicurati che il video venga mostrato una sola volta

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

        // Aggiungi il video al contenitore della pagina
        document.body.appendChild(video);

        // Avvia il video
        video.play();

        // Mette il video a schermo intero
        video.onplay = function () {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) { // Firefox
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { // IE/Edge
                video.msRequestFullscreen();
            }
        };

        // Controlla lo stato fullscreen
        checkFullscreenInterval = setInterval(() => {
            if (!isFullscreen()) {
                // Esci dalla modalità fullscreen
                video.pause(); // Metti in pausa il video
                video.currentTime = 0; // Resetta il video
                video.style.display = "none"; // Nascondi il video
                videoShown = false;
                video.remove(); // Rimuovi il video dal DOM
                clearInterval(checkFullscreenInterval); // Ferma il controllo
            }
        }, 200);
    }
}

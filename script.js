
// URL-Parameter auslesen
const params = new URLSearchParams(window.location.search);
const text = params.get("text") || "Kein Text angegeben";

// Sprachausgabe
function speakText() {
    if (!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "de-DE";

    speechSynthesis.speak(speech);
}

// Schriftgröße automatisch anpassen
function resizeWord() {
    const display = document.getElementById("text");

    if (!display) return;

    const availableWidth = window.innerWidth - 50;
    const availableHeight = window.innerHeight * 0.7;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let min = 1;
    let max = 1000;
    let best = 1;

    display.style.whiteSpace = "nowrap";
    display.style.width = "100%";

    while (min <= max) {
        const size = Math.floor((min + max) / 2);

        ctx.font = `bold ${size}px Arial`;

        const metrics = ctx.measureText(text);

        if (
            metrics.width <= availableWidth &&
            size <= availableHeight
        ) {
            best = size;
            min = size + 1;
        } else {
            max = size - 1;
        }
    }

    display.style.fontSize = best + "px";
}

// Initialisierung
window.addEventListener("DOMContentLoaded", () => {

    const display = document.getElementById("text");
    const playButton = document.getElementById("playButton");

    // Text anzeigen
    display.textContent = text;

    // Play-Button
    playButton.addEventListener("click", (event) => {
        event.stopPropagation();
        speakText();
    });

    // Jede Maus- oder Touchscreen-Eingabe
    document.addEventListener("pointerdown", (event) => {
        if (event.target.closest("#playButton")) return;
        speakText();
    });

    // Jede Tastatureingabe
    document.addEventListener("keydown", (event) => {
        if (event.repeat) return;
        speakText();
    });

    // Schriftgröße berechnen
    resizeWord();
});

// Bei Größenänderung neu berechnen
window.addEventListener("resize", resizeWord);

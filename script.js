
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

        const metrics = ctx.measureText(display.textContent);

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

window.addEventListener("DOMContentLoaded", resizeWord);
window.addEventListener("resize", resizeWord);

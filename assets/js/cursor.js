"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeCustomCursor();
});

function initializeCustomCursor() {
    const supportsFinePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    if (!supportsFinePointer) {
        return;
    }

    const cursorDot = document.createElement("div");
    const cursorOutline = document.createElement("div");

    cursorDot.className = "cursor-dot";
    cursorOutline.className = "cursor-outline";

    document.body.append(cursorDot, cursorOutline);

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.transform =
            `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.14;
        outlineY += (mouseY - outlineY) * 0.14;

        cursorOutline.style.transform =
            `translate(${outlineX}px, ${outlineY}px)`;

        requestAnimationFrame(animateOutline);
    }

    animateOutline();

    const interactiveElements = document.querySelectorAll(
        "a, button, .project-card, .editor"
    );

    interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            cursorOutline.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.classList.remove("cursor-hover");
        });
    });

    document.addEventListener("mouseleave", () => {
        cursorDot.classList.add("cursor-hidden");
        cursorOutline.classList.add("cursor-hidden");
    });

    document.addEventListener("mouseenter", () => {
        cursorDot.classList.remove("cursor-hidden");
        cursorOutline.classList.remove("cursor-hidden");
    });
}
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeCyberNavigation();
    initializeTerminalTyping();
    initializeHackButton();
    initializeTabletTilt();
});

/* ========================================
   CYBERHACK NAVIGATION
======================================== */

function initializeCyberNavigation() {
    const navigationButtons = document.querySelectorAll("[data-cyber-view]");
    const panels = document.querySelectorAll("[data-cyber-panel]");

    if (!navigationButtons.length || !panels.length) {
        return;
    }

    navigationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedView = button.dataset.cyberView;

            navigationButtons.forEach((item) => {
                item.classList.remove("active");
            });

            panels.forEach((panel) => {
                panel.classList.remove("active");
            });

            button.classList.add("active");

            const selectedPanel = document.querySelector(
                `[data-cyber-panel="${selectedView}"]`
            );

            selectedPanel?.classList.add("active");

            if (selectedView === "terminal") {
                typeTerminalCommand();
            }
        });
    });
}

/* ========================================
   TERMINAL TYPING
======================================== */

let terminalHasTyped = false;

function initializeTerminalTyping() {
    const terminalButton = document.querySelector(
        '[data-cyber-view="terminal"]'
    );

    terminalButton?.addEventListener("click", typeTerminalCommand);
}

function typeTerminalCommand() {
    if (terminalHasTyped) {
        return;
    }

    const typingElement = document.querySelector(".terminal-typing");

    if (!typingElement) {
        return;
    }

    const text = typingElement.dataset.terminalText || "";

    terminalHasTyped = true;
    typingElement.textContent = "";

    let characterIndex = 0;

    const typingInterval = window.setInterval(() => {
        typingElement.textContent += text.charAt(characterIndex);
        characterIndex += 1;

        if (characterIndex >= text.length) {
            window.clearInterval(typingInterval);
        }
    }, 42);
}

/* ========================================
   EXECUTE COMMAND
======================================== */

function initializeHackButton() {
    const executeButton = document.getElementById("executeHackButton");
    const tabletScreen = document.querySelector(".tablet-screen");

    if (!executeButton || !tabletScreen) {
        return;
    }

    executeButton.addEventListener("click", () => {
        if (executeButton.disabled) {
            return;
        }

        executeButton.disabled = true;
        executeButton.textContent = "Executing...";

        window.setTimeout(() => {
            executeButton.textContent = "Access granted";
            executeButton.classList.add("executed");

            tabletScreen.classList.remove("command-executed");

            void tabletScreen.offsetWidth;

            tabletScreen.classList.add("command-executed");

            window.setTimeout(() => {
                executeButton.textContent = "Execute command";
                executeButton.classList.remove("executed");
                executeButton.disabled = false;
            }, 2200);
        }, 1100);
    });
}

/* ========================================
   TABLET 3D TILT
======================================== */

function initializeTabletTilt() {
    const tablet = document.querySelector(".tablet");
    const tabletBody = document.querySelector(".tablet-body");

    if (!tablet || !tabletBody) {
        return;
    }

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!supportsFinePointer) {
        return;
    }

    tablet.addEventListener("mousemove", (event) => {
        const rect = tablet.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((mouseX - centerX) / centerX) * 8;
        const rotateX = -((mouseY - centerY) / centerY) * 8;

        tabletBody.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    tablet.addEventListener("mouseleave", () => {
        tabletBody.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}
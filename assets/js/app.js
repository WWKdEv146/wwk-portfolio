"use strict";

/* ========================================
   MAIN APP
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeDiscordButton();
    initializeExternalLinks();
    initializeCurrentYear();
});

/* ========================================
   DISCORD BUTTON
======================================== */

function initializeDiscordButton() {
    const discordButton = document.getElementById("discordButton");

    if (!discordButton) {
        return;
    }

    const discordUsername = "wwk";

    discordButton.addEventListener("click", async () => {
        const originalText = discordButton.textContent;

        try {
            await navigator.clipboard.writeText(discordUsername);

            discordButton.textContent = "Skopiowano: wwk";
            discordButton.classList.add("copied");

            setTimeout(() => {
                discordButton.textContent = originalText;
                discordButton.classList.remove("copied");
            }, 2200);
        } catch (error) {
            console.error("Nie udało się skopiować nazwy Discord:", error);

            discordButton.textContent = "Discord: wwk";

            setTimeout(() => {
                discordButton.textContent = originalText;
            }, 2200);
        }
    });
}

/* ========================================
   EXTERNAL LINKS
======================================== */

function initializeExternalLinks() {
    const externalLinks = document.querySelectorAll(
        'a[href^="http://"], a[href^="https://"]'
    );

    externalLinks.forEach((link) => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
}

/* ========================================
   CURRENT YEAR
======================================== */

function initializeCurrentYear() {
    const yearElement = document.querySelector("[data-current-year]");

    if (!yearElement) {
        return;
    }

    yearElement.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
    const discordButton = document.getElementById("discordButton");
    const copyStatus = document.getElementById("discordCopyStatus");

    if (!discordButton) {
        return;
    }

    discordButton.addEventListener("click", async () => {
        const discordName = discordButton.dataset.discord || "wwk";

        try {
            await navigator.clipboard.writeText(discordName);

            if (copyStatus) {
                copyStatus.textContent = "Skopiowano: " + discordName;
                copyStatus.classList.add("copied");
            }

            window.setTimeout(() => {
                if (copyStatus) {
                    copyStatus.textContent = "Kliknij, aby skopiować nazwę";
                    copyStatus.classList.remove("copied");
                }
            }, 2200);
        } catch {
            if (copyStatus) {
                copyStatus.textContent = "Discord: " + discordName;
            }
        }
    });
});

window.addEventListener("load", () => {
    const loader = document.getElementById("pageLoader");

    if (!loader) {
        return;
    }

    window.setTimeout(() => {
        loader.classList.add("hidden");
    }, 700);

    window.setTimeout(() => {
        loader.remove();
    }, 1500);
});
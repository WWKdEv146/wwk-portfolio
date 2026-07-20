"use strict";

/* ========================================
   NAVBAR
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeNavbar();
});

function initializeNavbar() {

    const header = document.querySelector("header");
    const links = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("section");

    if (!header) return;

    window.addEventListener("scroll", () => {

        /* Navbar background */

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        /* Active link */

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    });

}

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    initializeHeaderScroll();
    initializeMobileNavigation();
    initializeActiveNavigation();

    function initializeHeaderScroll() {
        if (!header) {
            return;
        }

        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 30);
        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }

    function initializeMobileNavigation() {
        if (!navToggle || !navMenu) {
            return;
        }

        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            navToggle.classList.toggle("active", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute(
                "aria-label",
                isOpen ? "Zamknij menu" : "Otwórz menu"
            );

            document.body.classList.toggle("nav-open", isOpen);
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 820) {
                closeMenu();
            }
        });

        function closeMenu() {
            navMenu.classList.remove("active");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Otwórz menu");

            document.body.classList.remove("nav-open");
        }
    }

    function initializeActiveNavigation() {
        if (!sections.length || !navLinks.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio -
                            first.intersectionRatio
                    );

                if (!visibleSections.length) {
                    return;
                }

                const currentSectionId =
                    visibleSections[0].target.getAttribute("id");

                navLinks.forEach((link) => {
                    const targetId =
                        link.getAttribute("href").replace("#", "");

                    link.classList.toggle(
                        "active",
                        targetId === currentSectionId
                    );
                });
            },
            {
                threshold: [0.2, 0.4, 0.6],
                rootMargin: "-20% 0px -55% 0px"
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });
    }
});
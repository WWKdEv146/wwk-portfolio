document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        "#about > *, .section-heading > *, .project-card, #contact > *"
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal-element");

        const delay = Math.min(index % 4, 3) * 90;
        element.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -70px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    initializeProjectTilt();
    initializeHeroParallax();
});

function initializeProjectTilt() {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            if (window.innerWidth <= 900) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const percentX = mouseX / rect.width;
            const percentY = mouseY / rect.height;

            const rotateY = (percentX - 0.5) * 7;
            const rotateX = (0.5 - percentY) * 7;

            card.style.setProperty("--mouse-x", `${mouseX}px`);
            card.style.setProperty("--mouse-y", `${mouseY}px`);

            card.style.transform = `
                perspective(1100px)
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

function initializeHeroParallax() {
    const hero = document.querySelector("#home");
    const editor = document.querySelector(".editor");

    if (!hero || !editor) {
        return;
    }

    hero.addEventListener("pointermove", (event) => {
        if (window.innerWidth <= 900) {
            return;
        }

        const rect = hero.getBoundingClientRect();

        const percentX =
            (event.clientX - rect.left) / rect.width - 0.5;

        const percentY =
            (event.clientY - rect.top) / rect.height - 0.5;

        editor.style.transform = `
            perspective(1200px)
            rotateX(${percentY * -7}deg)
            rotateY(${percentX * 9}deg)
            translate3d(${percentX * 12}px, ${percentY * 12}px, 0)
        `;
    });

    hero.addEventListener("pointerleave", () => {
        editor.style.transform = "";
    });
}
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
});

async function loadProjects() {

    const grid = document.querySelector(".projects-grid");

    if (!grid) return;

    try {

        const response = await fetch("data/projects.json");
        const projects = await response.json();

        grid.innerHTML = "";

        projects.forEach(project => {

            const tech = project.technologies
                .map(item => `<span>${item}</span>`)
                .join("");

            grid.innerHTML += `

            <article class="project-card">

                <div class="shine"></div>

                <div class="project-image">

                    <img src="${project.image}" alt="${project.title}">

                </div>

                <div class="project-content">

                    <small>${project.status}</small>

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <div class="project-tech">

                        ${tech}

                    </div>

                </div>

            </article>

            `;

        });

        initializeProjectEffects();

    }

    catch(error){

        console.error(error);

    }

}

function initializeProjectEffects(){

    const cards=document.querySelectorAll(".project-card");

    cards.forEach(card=>{

        const shine=card.querySelector(".shine");

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;
            const y=e.clientY-rect.top;

            const rotateX=-(y-rect.height/2)/18;
            const rotateY=(x-rect.width/2)/18;

            card.style.transform=`
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
            `;

            shine.style.background=`
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255,255,255,.28),
                    transparent 45%
                )
            `;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

            shine.style.background="";

        });

    });

}
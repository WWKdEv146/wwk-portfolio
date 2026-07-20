const modal = document.getElementById("videoModal");
const video = document.getElementById("projectVideo");
const closeButton = document.getElementById("videoModalClose");

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("click", () => {

        const src = card.dataset.video;

        video.src = src;

        modal.classList.add("active");

        video.play();

    });

});

function closeVideo(){

    modal.classList.remove("active");

    video.pause();

    video.currentTime = 0;

    video.src = "";

}

closeButton.addEventListener("click", closeVideo);

document.querySelector(".video-backdrop")
.addEventListener("click", closeVideo);

document.addEventListener("keydown", e=>{

    if(e.key==="Escape"){

        closeVideo();

    }

});
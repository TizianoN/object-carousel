// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo 
// l'immagine grande in modo da poter stilare lo slider.

// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l'array di oggetti letterali per popolare dinamicamente il carosello. Al click dell'utente 
// sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

// Milestone 2:
// Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, 
// la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.

// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l'immagine corrispondente.

// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l'immagine attiva dovrà cambiare alla successiva.

// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

const slides = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    },
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    },
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    },
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

// * RECUPERO GLI ELEMENTI HTML
const slidesContainerEl = document.getElementById("slides-container");
const thumbsContainerEl = document.getElementById("thumbs-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const stopAutoplayButton = document.getElementById("stop-autoplay");
const invertiAutoplayButton = document.getElementById("inverti-autoplay");

// * SETTO IL "CONTATORE" DELL'IMMAGINE ATTIVA
let activeImage = 0;

// * GENERO SLIDES E THUMBNAILS
slides.forEach((slide, index) => {
    slidesContainerEl.innerHTML += `
    <div class="slide ${(index == activeImage) ? "active" : ""}">
        <img src="./${slide.image}">
        <div class="slide-text">
            <h2>${slide.title}</h2>
            <p>${slide.text}</p>
        </div>
    </div>`;

    thumbsContainerEl.innerHTML += `
    <div class="thumb" data-index="${index}">
        <img src="./${slide.image}">
    </div>
    `;
});

// * LEGO IL CLICK DELLE THUMBNAILS AL CAMBIO DELL'IMMAGINE VISUALIZZATA
const thumbsEl = document.querySelectorAll(".thumb");
thumbsEl.forEach((thumbEl, index) => {
    thumbEl.addEventListener("click", function () {
        const thisIndex = this.getAttribute("data-index");
        switchToSlide(thisIndex);
    })
})

// * CREO UNA FUNZIONE PER GESTIRE L'AVANZAMENTO DEL CAROSELLO
const onNextClick = () => {
    activeImage++;

    if (activeImage >= slides.length) {
        activeImage = 0;
    }

    // console.log(activeImage);

    switchToSlide(activeImage);
}

// * CREO UNA FUNZIONE PER GESTIRE L'ARRETRAMENTO DEL CAROSELLO
const onPrevClick = () => {
    activeImage--;

    if (activeImage < 0) {
        activeImage = slides.length - 1;
    }

    // console.log(activeImage);

    switchToSlide(activeImage);
}

// * CREO UNA FUNZIONE PER CAMBIARE L'IMMAGINE VISUALIZZATA
const switchToSlide = (activeIndex) => {
    const activeSlide = document.querySelector(".slide.active");
    const allSlides = document.querySelectorAll(".slide");

    activeSlide.classList.remove("active");
    allSlides[activeIndex].classList.add("active");
}

// * LEGO IL CLICK DEI CONTROLLI ALLE FUNZIONI DI AVANZAMENTO E ARRETRAMENTO
nextButton.addEventListener("click", onNextClick)
prevButton.addEventListener("click", onPrevClick)

// * AUTOPLAY
let autoplayForward = true;

const autoplay = setInterval(() => {
    if (autoplayForward) {
        onNextClick();
    } else {
        onPrevClick();
    }

}, 3000);

// * STOP AUTOPLAY
stopAutoplayButton.addEventListener("click", () => {
    clearInterval(autoplay);
});

// * INVERTI AUTOPLAY

invertiAutoplayButton.addEventListener("click", () => {
    autoplayForward = !autoplayForward;
});
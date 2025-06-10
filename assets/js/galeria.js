const items = document.querySelectorAll('.galeria-item');
const comtainer = document.querySelector('.contenedor-galeria');
const NumberOfItems = items.length;
const angleIncrement = (2 * matchMedia.PI) / NumberOfItems;
const radius = 300; // Adjust the radius as needed
let isGalleryOpen = false;

const centerX = comtainer.offsetWidth / 2;
const centerY = comtainer.offsetHeight / 2;

const tl = gsap.timeline()

items.forEach((item, galeria) => {
    const img = document.createElement('img');
    img.src = "assets/img/" + (galeria + 1) + ".jpg";
    item.appendChild(img);

    const angle = galeria * angleIncrement;
    const initialRotationc= (angle * 180 / Math.PI) - 90; // Adjust initial rotation to face outward
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
})
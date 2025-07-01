// assets/js/sobre.js

document.addEventListener('DOMContentLoaded', () => {
    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});


let currentIndex = 0;
let cards = [];
let liked = [];
let disliked = [];

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem('role') || 'jobseeker';
    fetchCards(role);
});

function fetchCards(role) {
    // Reset data and sections
    currentIndex = 0;
    cards = [];
    liked = [];
    disliked = [];
    clearLikedDislikedSections();

    fetch(`/swipe_cards?role=${role}`)
        .then(response => response.json())
        .then(data => {
            cards = data;
            renderCards();
        })
        .catch(error => console.error("Error fetching cards:", error));
}

function renderCards() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ""; // Clear previous cards

    cards.forEach((card, index) => {
        const cardHTML = card.role === "jobseeker"
            ? `
                <div class="card draggable" data-index="${index}">
                    <h3>${card.name}</h3>
                    <p>Skills: ${card.skills.join(", ")}</p>
                </div>
            `
            : `
                <div class="card draggable" data-index="${index}">
                    <h3>${card.title}</h3>
                    <p>Description: ${card.description}</p>
                </div>
            `;
        cardContainer.innerHTML += cardHTML;
    });

    addDragListeners();
}

function addDragListeners() {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(card => {
        let startX, currentX;

        card.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });

        card.addEventListener('touchmove', e => {
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            card.style.transform = `translateX(${diff}px) rotate(${diff / 10}deg)`;
        });

        card.addEventListener('touchend', e => {
            const diff = currentX - startX;

            // Swiped right (Like)
            if (diff > 100) {
                handleSwipe(card, 'like');
            }
            // Swiped left (Dislike)
            else if (diff < -100) {
                handleSwipe(card, 'dislike');
            } else {
                // Reset position if swipe is insufficient
                card.style.transform = 'translateX(0px) rotate(0deg)';
            }
        });
    });
}

function handleSwipe(card, action) {
    const index = card.getAttribute('data-index');
    const swipedCard = cards[index];

    // Add to Liked/Disliked
    if (action === 'like') {
        liked.push(swipedCard);
        updateLikedDislikedSection('liked', swipedCard);
    } else if (action === 'dislike') {
        disliked.push(swipedCard);
        updateLikedDislikedSection('disliked', swipedCard);
    }

    // Remove card from carousel
    card.remove();

    // Show the next card
    currentIndex++;
}

function swipe(action) {
    // Backup buttons: Like/Dislike
    const card = document.querySelector('.draggable');
    if (!card) return;

    handleSwipe(card, action);
}

function updateLikedDislikedSection(section, card) {
    const container = document.getElementById(`${section}-container`);
    const cardHTML = card.role === "jobseeker"
        ? `
            <div class="card">
                <h3>${card.name}</h3>
                <p>Skills: ${card.skills.join(", ")}</p>
            </div>
        `
        : `
            <div class="card">
                <h3>${card.title}</h3>
                <p>Description: ${card.description}</p>
            </div>
        `;
    container.innerHTML += cardHTML;
}

function clearLikedDislikedSections() {
    document.getElementById("liked-container").innerHTML = "";
    document.getElementById("disliked-container").innerHTML = "";
}

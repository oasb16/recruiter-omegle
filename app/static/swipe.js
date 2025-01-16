let currentIndex = 0;
let cards = [];
let liked = [];
let disliked = [];
const profileCounter = document.getElementById('profile-counter');

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem('role') || 'jobseeker';
    fetchCards(role);

    // Carousel navigation buttons
    document.getElementById('prev-btn').addEventListener('click', () => navigateCarousel(-1));
    document.getElementById('next-btn').addEventListener('click', () => navigateCarousel(1));

    // Close modal functionality
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('detail-modal').style.display = 'none';
    });
});

function fetchCards(role) {
    fetch(`/swipe_cards?role=${role}`)
        .then(response => response.json())
        .then(data => {
            cards = data;
            updateCounter();
            renderCarousel();
        })
        .catch(error => console.error("Error fetching cards:", error));
}

function updateCounter() {
    const totalProfiles = cards.length;
    profileCounter.innerText = `Total Profiles: ${totalProfiles}`;
}

function renderCarousel() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ""; // Clear previous cards

    cards.forEach((card, index) => {
        const cardHTML = `
            <div class="card draggable" data-index="${index}" style="z-index: ${cards.length - index}; transform: translateX(${(index - currentIndex) * 100}%)">
                <h3>${truncateText(card.role, 15)}</h3>
                <p><strong>Company:</strong> ${truncateText(card.company_name, 15)}</p>
                <p><strong>Location:</strong> ${truncateText(card.location, 15)}</p>
                <a href="#" onclick="showDetails('${card.role}', '${card.company_name}', '${card.location}')">More Details</a>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
    });

    updateDeckedCards();
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
}

function showDetails(role, company, location) {
    const modal = document.getElementById('detail-modal');
    document.getElementById('modal-title').innerText = `Details`;
    document.getElementById('modal-body').innerText = `
        Role: ${role}\n
        Company: ${company}\n
        Location: ${location}
    `;
    modal.style.display = 'block';
}

function navigateCarousel(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= cards.length) currentIndex = cards.length - 1;

    renderCarousel();
    updateDeckedCards();
}

function updateDeckedCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card, index) => {
        const offset = index - currentIndex;
        card.style.transform = `translateX(${offset * 100}%) scale(${1 - Math.abs(offset) * 0.1})`;
        card.style.opacity = Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.5;
    });
}

function swipe(action) {
    if (currentIndex < cards.length) {
        const card = cards[currentIndex];
        if (action === 'like') {
            liked.push(card);
            document.getElementById('liked-container').innerHTML += `
                <div class="card">
                    <h3>${card.role}</h3>
                    <p>${card.company_name}</p>
                </div>
            `;
        } else {
            disliked.push(card);
            document.getElementById('disliked-container').innerHTML += `
                <div class="card">
                    <h3>${card.role}</h3>
                    <p>${card.company_name}</p>
                </div>
            `;
        }
        currentIndex++;
        renderCarousel();
        updateCounter();
    }
}

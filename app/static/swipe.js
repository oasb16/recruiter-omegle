let currentIndex = 0;
let cards = [];
let liked = [];
let disliked = [];

document.addEventListener("DOMContentLoaded", () => {
    const recruiterBtn = document.getElementById("recruiter-btn");
    const jobseekerBtn = document.getElementById("jobseeker-btn");

    recruiterBtn.addEventListener("click", () => fetchCards("recruiter"));
    jobseekerBtn.addEventListener("click", () => fetchCards("jobseeker"));
});

function fetchCards(role) {
    // Reset cards and sections when a new role is selected
    currentIndex = 0;
    cards = [];
    liked = [];
    disliked = [];
    clearLikedDislikedSections();

    fetch(`/swipe_cards?role=${role}`)
        .then(response => response.json())
        .then(data => {
            cards = data;
            showCard();
        })
        .catch(error => console.error("Error fetching cards:", error));
}

function showCard() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ""; // Clear previous card

    if (currentIndex < cards.length) {
        const card = cards[currentIndex];
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
        cardContainer.innerHTML = cardHTML;
    } else {
        cardContainer.innerHTML = "<p>No more profiles to swipe!</p>";
    }
}

function swipe(action) {
    if (currentIndex < cards.length) {
        const card = cards[currentIndex];

        // Add card to Liked or Disliked section
        if (action === "like") {
            liked.push(card);
            updateLikedDislikedSection("liked", card);
        } else if (action === "dislike") {
            disliked.push(card);
            updateLikedDislikedSection("disliked", card);
        }

        // Increment index and show the next card
        currentIndex++;
        showCard();
    }
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

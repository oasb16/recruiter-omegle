let currentIndex = 0;
let cards = [];

function fetchCards(role) {
    fetch(`/api/swipe_cards?role=${role}`)
        .then(response => response.json())
        .then(data => {
            cards = data;
            showCard();
        })
        .catch(error => console.error("Error fetching cards:", error));
}

function showCard() {
    const cardContainer = document.getElementById('card-container');
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
        cardContainer.innerHTML = "<p>No more cards to swipe!</p>";
    }
}

function swipe(action) {
    const card = cards[currentIndex];
    fetch('/record_swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card, action })
    })
        .then(() => {
            currentIndex++;
            showCard();
        })
        .catch(error => console.error("Error recording swipe:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    const recruiterBtn = document.getElementById("recruiter-btn");
    const jobseekerBtn = document.getElementById("jobseeker-btn");
    const cardContainer = document.getElementById("card-container");

    recruiterBtn.addEventListener("click", () => fetchCards("recruiter"));
    jobseekerBtn.addEventListener("click", () => fetchCards("jobseeker"));

    function fetchCards(role) {
        fetch(`/swipe_cards?role=${role}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    cardContainer.innerHTML = `<p>${data.error}</p>`;
                } else {
                    renderCards(data, role);
                }
            })
            .catch(error => console.error("Error fetching cards:", error));
    }

    function renderCards(cards, role) {
        cardContainer.innerHTML = ""; // Clear previous cards
        cards.forEach(card => {
            const cardHTML = role === "recruiter"
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
            cardContainer.innerHTML += cardHTML;
        });
    }
});


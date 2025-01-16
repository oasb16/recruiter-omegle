let currentIndex = 0;
let cards = [];

function fetchCards(role) {
    fetch(`/swipe_cards?role=${role}`)
        .then(response => response.json())
        .then(data => {
            cards = data;
            showCard();
        });
}

function showCard() {
    const cardContainer = document.getElementById('card-container');
    if (currentIndex < cards.length) {
        const card = cards[currentIndex];
        cardContainer.innerHTML = `<div class="card">
            <h3>${card.name}</h3>
            <p>Role: ${card.role}</p>
        </div>`;
    } else {
        cardContainer.innerHTML = "<p>No more cards to swipe!</p>";
    }
}

function swipe(action) {
    const card = cards[currentIndex];
    fetch('/swipe_action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            recruiter_id: action === 'like' ? card.id : null,
            jobseeker_id: action === 'dislike' ? card.id : null,
            action
        })
    }).then(() => {
        currentIndex++;
        showCard();
    });
}

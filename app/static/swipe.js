let currentIndex = 0;
let cards = [];
let liked = JSON.parse(localStorage.getItem('liked')) || [];
let disliked = JSON.parse(localStorage.getItem('disliked')) || [];
const profileCounter = document.getElementById('profile-counter');
const recruiterToggle = document.getElementById('recruiter-toggle');

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
    const role = recruiterToggle.checked ? "recruiter" : "jobseeker";
    fetchCards(role);

    // Refresh Button
    document.getElementById('refresh-btn').addEventListener('click', () => {
        currentIndex = 0;
        const role = recruiterToggle.checked ? "recruiter" : "jobseeker";
        fetchCards(role);
    });

    // Toggle Event
    recruiterToggle.addEventListener("change", () => {
        currentIndex = 0;
        const role = recruiterToggle.checked ? "recruiter" : "jobseeker";
        fetchCards(role);
    });

    // Expand/Collapse Stacks
    document.getElementById('liked-header').addEventListener('click', toggleLikedSection);
    document.getElementById('disliked-header').addEventListener('click', toggleDislikedSection);

    // Render Persistent Liked/Disliked Jobs
    renderLikedSection();
    renderDislikedSection();
});

// Fetch Cards
function fetchCards(role) {
    console.log("Fetching cards for role:", role);

    if (role === "jobseeker") {
        fetch("/findwork_api")
            .then((response) => response.json())
            .then((data) => {
                // Exclude liked and disliked jobs
                console.log(response)
                cards = data.filter(
                    (job) => !liked.some((likedJob) => likedJob.id === job.id) &&
                             !disliked.some((dislikedJob) => dislikedJob.id === job.id)
                );
                updateCounter();
                renderCarousel();
            })
            .catch((error) => {
                console.error("Error fetching cards:", error);
                profileCounter.innerText = "Failed to load profiles.";
            });
    } else {
        // Dummy Data for Recruiters
        cards = [
            { name: "Alice", skills: ["JavaScript", "React"] },
            { name: "Bob", skills: ["Python", "Django"] },
        ];
        updateCounter();
        renderCarousel();
    }
}

// Update Counter
function updateCounter() {
    profileCounter.innerText = `Total Profiles: ${cards.length}`;
}

// Render Carousel
function renderCarousel() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    if (cards.length === 0) {
        cardContainer.innerHTML = "<p>No profiles to display.</p>";
        return;
    }

    cards.forEach((card, index) => {
        const role = card.role || "No Role Specified";
        const company = card.company_name || "Unknown Company";
        const location = card.location || "No Location Specified";

        const cardHTML = `
            <div class="card draggable" data-index="${index}" style="z-index: ${cards.length - index}; transform: translateX(${(index - currentIndex) * 110}%) scale(${1 - Math.abs(index - currentIndex) * 0.1});">
                <h3>${truncateText(role, 15)}</h3>
                <p><strong>Company:</strong> ${truncateText(company, 15)}</p>
                <p><strong>Location:</strong> ${truncateText(location, 15)}</p>
                <a href="#" onclick="showDetails(${index})">More Details</a>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
    });
}

// Like/Dislike Buttons
function swipeCard(action) {
    if (currentIndex < cards.length) {
        const card = cards[currentIndex];
        if (action === "like") {
            liked.push(card);
            localStorage.setItem('liked', JSON.stringify(liked));
            renderLikedSection();
        } else if (action === "dislike") {
            disliked.push(card);
            localStorage.setItem('disliked', JSON.stringify(disliked));
            renderDislikedSection();
        }
        cards.splice(currentIndex, 1); // Remove from cards
        renderCarousel();
        updateCounter();
    }
}

// Render Liked Section
function renderLikedSection() {
    const likedContainer = document.getElementById("liked-container");
    likedContainer.innerHTML = liked.map(
        (card) => `
        <div class="card">
            <h3>${truncateText(card.role || card.name || "Unknown Role", 15)}</h3>
            <p>${truncateText(card.company_name || "Unknown Company", 15)}</p>
        </div>`
    ).join('');
}

// Render Disliked Section
function renderDislikedSection() {
    const dislikedContainer = document.getElementById("disliked-container");
    dislikedContainer.innerHTML = disliked.map(
        (card) => `
        <div class="card">
            <h3>${truncateText(card.role || card.name || "Unknown Role", 15)}</h3>
            <p>${truncateText(card.company_name || "Unknown Company", 15)}</p>
        </div>`
    ).join('');
}

// Expand/Collapse Liked Section
function toggleLikedSection() {
    const likedContainer = document.getElementById("liked-container");
    likedContainer.style.display = likedContainer.style.display === "none" ? "block" : "none";
}

// Expand/Collapse Disliked Section
function toggleDislikedSection() {
    const dislikedContainer = document.getElementById("disliked-container");
    dislikedContainer.style.display = dislikedContainer.style.display === "none" ? "block" : "none";
}

// // Update Liked/Disliked Sections
// function updateLikedSection() {
//     const likedContainer = document.getElementById("liked-container");
//     likedContainer.innerHTML = "";
//     liked.forEach((card) => {
//         likedContainer.innerHTML += `
//             <div class="card">
//                 <h3>${truncateText(card.role, 15)}</h3>
//                 <p>${truncateText(card.company_name, 15)}</p>
//             </div>
//         `;
//     });
// }

// function updateDislikedSection() {
//     const dislikedContainer = document.getElementById("disliked-container");
//     dislikedContainer.innerHTML = "";
//     disliked.forEach((card) => {
//         dislikedContainer.innerHTML += `
//             <div class="card">
//                 <h3>${truncateText(card.role, 15)}</h3>
//                 <p>${truncateText(card.company_name, 15)}</p>
//             </div>
//         `;
//     });
// }

// Truncate Text
function truncateText(text, wordLimit) {
    const words = (text || "").split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
}

// Navigate Carousel
function navigateCarousel(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= cards.length) currentIndex = cards.length - 1;

    renderCarousel();
}

// Show Details in Modal
function showDetails(index) {
    const card = cards[index];
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.innerText = card.role || "No Title Available";
    modalBody.innerHTML = `
        <p><strong>Company:</strong> ${card.company_name}</p>
        <p><strong>Location:</strong> ${card.location}</p>
        <p><strong>Description:</strong> ${card.description}</p>
        <p><strong>Date Posted:</strong> ${card.date_posted}</p>
        <p><strong>URL:</strong> <a href="${card.url}" target="_blank">${card.url}</a></p>
    `;

    modal.style.display = "block";
}
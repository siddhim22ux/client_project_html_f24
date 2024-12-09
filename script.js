
// Handle form submission
document.getElementById('review-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const restaurantName = document.getElementById('restaurant-name').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('image-url').value || 'https://via.placeholder.com/300x200';
    const address = document.getElementById('address').value;

    // Create a new card element
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerHTML = `
      <div class="card_image">
        <img src="${imageUrl}" alt="${restaurantName}">
      </div>
      <div class="card_content">
        <h2 class="card_title">${restaurantName}</h2>
        <p>${description}</p>
        <p class="info">${address}</p>
      </div>
    `;

    // Append the new card to the grid
    document.querySelector('.cards-grid').appendChild(newCard);

    // Reset the form
    document.getElementById('review-form').reset();
});



// Animate the new spot
setTimeout(() => {
    spotDiv.style.opacity = 1; // Fade in effect
    spotDiv.style.transition = 'opacity 0.8s ease';
}, 100);

// Add delete functionality to the button
spotDiv.querySelector('.delete-btn').addEventListener('click', function () {
    spotDiv.style.opacity = 0;
    setTimeout(() => {
        topSpotsSection.removeChild(spotDiv);
    }, 500); // Matches the fade-out duration
});

// Display a success message
const form = document.getElementById('review-form');
const successMessage = document.createElement('p');
successMessage.textContent = 'Your review has been added successfully!';
successMessage.style.color = '#2c3e50';
successMessage.style.marginTop = '10px';
successMessage.style.fontSize = '1rem';
successMessage.style.textAlign = 'center';

// Remove any existing messages before adding a new one
const existingMessage = form.querySelector('.success-message');
if (existingMessage) {
    form.removeChild(existingMessage);
}

successMessage.classList.add('success-message');
form.appendChild(successMessage);

// Clear the form fields
document.getElementById('restaurant-name').value = '';
document.getElementById('description').value = '';
document.getElementById('address').value = '';




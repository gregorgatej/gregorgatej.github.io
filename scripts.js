// Global variables
let allPublications = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Load publications data
  loadPublications();
  
  // Initialize animation delays for sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
});

// Load publications from JSON file
function loadPublications() {
  fetch('publications.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Publications loaded successfully:", data);
      allPublications = data.publications;
      renderPublications();
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      // Create fallback publications display if JSON loading fails
      displayFallbackPublications();
    });
}

// Fallback if JSON loading fails
function displayFallbackPublications() {
  const container = document.getElementById('publications-container');
  container.innerHTML = `Error loading publications.`;
}

// Render publications
function renderPublications() {
  const publicationsContainer = document.getElementById('publications-container');
  publicationsContainer.innerHTML = '';
  
  allPublications.forEach(publication => {
    const pubElement = createPublicationElement(publication);
    publicationsContainer.appendChild(pubElement);
  });
}

// Create HTML element for a publication
function createPublicationElement(publication) {
  const pubItem = document.createElement('div');
  pubItem.className = 'publication-item';
  
  // Make entire item clickable
  pubItem.addEventListener('click', function(e) {
    // If clicking on the link itself, let it handle navigation normally
    if (e.target.tagName === 'A') {
      return;
    }
    // Otherwise, navigate using the publication link
    window.location.href = publication.link || '#';
  });
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'pub-content';
  
  // Add title as link
  const title = document.createElement('h3');
  title.className = 'pub-title';
  const titleLink = document.createElement('a');
  titleLink.href = publication.link || '#';
  titleLink.textContent = publication.title;
  title.appendChild(titleLink);
  content.appendChild(title);
  
  // Add description
  const description = document.createElement('p');
  description.textContent = publication.description;
  content.appendChild(description);
  
  pubItem.appendChild(content);
  
  return pubItem;
}



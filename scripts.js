// Global variables
let allArticles = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Load articles data
  loadArticles();
  
  // Initialize animation delays for sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
});

// Load articles from JSON file
function loadArticles() {
  fetch('articles.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Articles loaded successfully:", data);
      allArticles = data.articles;
      renderArticles();
    })
    .catch(error => {
      console.error('Error loading articles:', error);
      // Create fallback articles display if JSON loading fails
      displayFallbackArticles();
    });
}

// Fallback if JSON loading fails
function displayFallbackArticles() {
  const container = document.getElementById('articles-container');
  container.innerHTML = `Error loading articles.`;
}

// Render articles
function renderArticles() {
  const articlesContainer = document.getElementById('articles-container');
  articlesContainer.innerHTML = '';
  
  allArticles.forEach(article => {
    const pubElement = createArticleElement(article);
    articlesContainer.appendChild(pubElement);
  });
}

// Create HTML element for an article
function createArticleElement(article) {
  const pubItem = document.createElement('div');
  pubItem.className = 'article-item';
  
  // Make entire item clickable
  pubItem.addEventListener('click', function(e) {
    // If clicking on the link itself, let it handle navigation normally
    if (e.target.tagName === 'A') {
      return;
    }
    // Otherwise, navigate using the article link
    window.location.href = article.link || '#';
  });
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'pub-content';
  
  // Add title as link
  const title = document.createElement('h3');
  title.className = 'pub-title';
  const titleLink = document.createElement('a');
  titleLink.href = article.link || '#';
  titleLink.textContent = article.title;
  title.appendChild(titleLink);
  content.appendChild(title);
  
  // Add description
  const description = document.createElement('p');
  description.textContent = article.description;
  content.appendChild(description);
  
  pubItem.appendChild(content);
  
  return pubItem;
}



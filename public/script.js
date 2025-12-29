// Real article data with API fallback
const fallbackArticles = {
    latest: [
        { id: 1, title: "Breaking: Major World Event Unfolds", excerpt: "Global markets react to unexpected Fed decision...", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop" },
        { id: 2, title: "Technology Revolution Hits Hard", excerpt: "AI breakthroughs changing industries worldwide...", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" },
        { id: 3, title: "Economy News You Can't Ignore", excerpt: "Inflation data shocks analysts and investors...", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop" }
    ],
    sports: [
        { id: 4, title: "Epic Championship Match Ends in Drama", excerpt: "Last-minute goal sends fans into frenzy...", image: "https://images.unsplash.com/photo-1559776452-8d93d4a5eacc?w=400&h=200&fit=crop" },
        { id: 5, title: "Record-Breaking Performance Stuns World", excerpt: "Athlete shatters world record by 2 seconds...", image: "https://images.unsplash.com/photo-1541532714111-1d0f3a026f15?w=400&h=200&fit=crop" }
    ],
    entertainment: [
        { id: 6, title: "Hollywood Blockbuster Secrets Revealed", excerpt: "Major plot twists leaked from set...", image: "https://images.unsplash.com/photo-1489599199157-794d9b8e7dd2?w=400&h=200&fit=crop" },
        { id: 7, title: "Music Awards Shock Everyone", excerpt: "Underdog takes home Album of the Year...", image: "https://images.unsplash.com/photo-1614700877622-406eb3a8d8e0?w=400&h=200&fit=crop" }
    ]
};

// Load articles from API or fallback
async function loadArticles(category) {
    try {
        const response = await fetch(`/api/articles/${category}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log('Using fallback data for', category);
    }
    return fallbackArticles[category] || [];
}

// Populate all articles
async function populateArticles() {
    const categories = ['latest', 'sports', 'entertainment'];
    
    for (const category of categories) {
        const articles = await loadArticles(category);
        const container = document.getElementById(`${category}-articles`);
        
        if (container) {
            container.innerHTML = '';
            articles.forEach(article => {
                const views = Math.floor(Math.random() * 50 + 10);
                const hours = Math.floor(Math.random() * 24) + 1;
                container.innerHTML += `
                    <article class="article-card" onclick="openArticle(${article.id})">
                        <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy">
                        <div class="article-content">
                            <h4 class="article-title">${article.title}</h4>
                            <p class="article-excerpt">${article.excerpt}</p>
                            <div class="article-meta">
                                <span>🔥 ${views}k views</span>
                                <span>${hours}h ago</span>
                            </div>
                        </div>
                    </article>
                `;
            });
        }
    }
}

// Article click handler
function openArticle(id) {
    // In production, this would load real article
    alert(`Opening article ID: ${id}\n\nIn production: window.location.href = '/article/${id}'`);
}

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact form
document.querySelector('.contact-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, message })
        });
        alert('Message sent! Thanks for contacting us.');
        this.reset();
    } catch (error) {
        alert('Please try again later.');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateArticles();
    showSlide(0);
});

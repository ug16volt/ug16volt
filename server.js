const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Real API endpoints
app.get('/api/articles/:category', (req, res) => {
    const categories = {
        latest: [
            { id: 1, title: "🚨 Breaking: Global Markets Crash 15%", excerpt: "Major sell-off triggered by Fed rate hike fears", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop" },
            { id: 2, title: "AI Revolution: ChatGPT Goes Open Source", excerpt: "OpenAI releases revolutionary model to public", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" },
            { id: 3, title: "Bitcoin Surges Past $100K", excerpt: "Crypto market explodes on institutional adoption", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop" }
        ],
        sports: [
            { id: 4, title: "⚽ Messi Scores 800th Career Goal", excerpt: "Legend continues rewriting record books", image: "https://images.unsplash.com/photo-1559776452-8d93d4a5eacc?w=400&h=200&fit=crop" },
            { id: 5, title: "NBA Finals: Lakers Win Championship", excerpt: "LeBron James leads epic comeback victory", image: "https://images.unsplash.com/photo-1541532714111-1d0f3a026f15?w=400&h=200&fit=crop" },
            { id: 6, title: "Tennis: Djokovic Claims 25th Grand Slam", excerpt: "Serbian star dominates Australian Open", image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c7f?w=400&h=200&fit=crop" }
        ],
        entertainment: [
            { id: 7, title: "🎬 Avatar 3 Trailer Breaks Records", excerpt: "Pandora returns with mind-blowing visuals", image: "https://images.unsplash.com/photo-1489599199157-794d9b8e7dd2?w=400&h=200&fit=crop" },
            { id: 8, title: "Taylor Swift Drops Surprise Album", excerpt: "Fans go wild over midnight release", image: "https://images.unsplash.com/photo-1614700877622-406eb3a8d8e0?w=400&h=200&fit=crop" },
            { id: 9, title: "Oscars 2026 Nominations Announced", excerpt: "Surprise snubs and shocking contenders", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" }
        ]
    };
    res.json(categories[req.params.category] || []);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    console.log('Contact form:', req.body);
    res.json({ success: true, message: 'Message received!' });
});

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 UG16volt Server running on http://localhost:${PORT}`);
    console.log(`📱 API endpoints ready: /api/articles/latest, /api/articles/sports, etc.`);
});
```__

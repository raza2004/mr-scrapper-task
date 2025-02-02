const express = require('express');
const path = require('path');
const { scrapeEbayProducts } = require('./api');
const fs = require('fs');

const app = express();
const PORT = 3000;
const filePath = 'products.json';

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, '')));

// Route to fetch products
app.get('/products', async (req, res) => {
    try {
        // Check if JSON file exists and has content
        if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
            console.log('Products file missing or empty. Scraping now...');
            await scrapeEbayProducts('nike'); // Scrape if data is missing
        }

        // Read and parse JSON safely
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (!fileContent.trim()) throw new Error('Empty JSON file');

        const products = JSON.parse(fileContent);
        return res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

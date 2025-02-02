const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeEbayProducts(searchQuery) {
    const baseUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchQuery)}&_pgn=1`;
    const products = [];

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    console.log(`🔍 Scraping first 10 products from: ${baseUrl}`);
    await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    const pageProducts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.s-item'))
            .slice(0, 10) // Limit to 10 products
            .map(item => ({
                title: item.querySelector('.s-item__title')?.innerText.trim() || '-',
                price: item.querySelector('.s-item__price')?.innerText.trim() || '-',
                link: item.querySelector('.s-item__link')?.href || '#'
            }));
    });

    // Loop through each product to visit its page and fetch the description
    for (let product of pageProducts) {
        if (product.link !== '#') {
            const productPage = await browser.newPage();
            await productPage.goto(product.link, { waitUntil: 'domcontentloaded', timeout: 60000 });

            // Extract product description
            const description = await productPage.evaluate(() => {
                const descElement = document.querySelector('#viTabs_0_is'); // eBay description section
                return descElement ? descElement.innerText.trim() : '-';
            });

            product.description = description;
            await productPage.close();
        } else {
            product.description = '-';
        }
        console.log(`✅ Fetched description for: ${product.title}`);
    }

    products.push(...pageProducts);

    await browser.close();
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    console.log(`✅ Scraped ${products.length} products and saved to products.json`);
}

module.exports = { scrapeEbayProducts };

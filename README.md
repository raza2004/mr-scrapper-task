# eBay Product Scraper

This Node.js application scrapes product listings from eBay, extracts details such as product name, price, and description, and displays them in a simple UI. The scraped data is saved in a JSON file (`products.json`) and served via an HTTP server.

---

## **Features**

- Scrapes product listings from eBay based on a search query.
- Extracts product details:
  - Title
  - Price
  - Description (from nested product detail pages)
- Handles pagination to scrape all products across multiple pages.
- Saves the scraped data to a JSON file (`products.json`).
- Displays the scraped data in a simple HTML table UI.

---

## **Prerequisites**

Before running the application, ensure you have the following installed:

1. **Node.js**:
   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
   - Verify installation by running:
     ```bash
     node -v
     npm -v
     ```

2. **Git** (optional):
   - If you're cloning this repository, ensure Git is installed: [https://git-scm.com/](https://git-scm.com/).

---

## **Installation**

### Step 1: Clone the Repository (if applicable)
If you're using a Git repository, clone it using the following command:
```bash
git clone https://github.com/your-repo-url/eBay-scraper.git
cd mr-scrapper-task
```

### Step 2: Install Dependencies
Install the required Node.js modules using `npm`:
```bash
npm install
```

This will install the following dependencies:
- `puppeteer`: For web scraping.
- `express`: For creating the HTTP server.

---

## **Running the Application**

### Step 1: Start the Server
Run the application using the following command:
```bash
node server.js
```

The server will start on `http://localhost:3000`.

### Step 2: Access the UI
Open your browser and navigate to:
```
http://localhost:3000/views/index.html
```

The UI will display the scraped product listings in a table format.

---

## **How It Works**

1. **Scraping Logic**:
   - The `api.js` file contains the scraping logic.
   - It uses Puppeteer to navigate eBay's search results page, extract product details, and save them to `products.json`.

2. **HTTP Server**:
   - The `server.js` file sets up an Express server to serve the scraped data.
   - When you access the UI, the server reads the `products.json` file and displays the data in a table.

3. **Pagination**:
   - The scraper handles pagination to fetch all products across multiple pages.

4. **Error Handling**:
   - If `products.json` is missing or invalid, the server triggers a fresh scrape.

---

## **Folder Structure**

```
project/
│
├── api.js          # Scraping logic to extract product details
├── server.js       # HTTP server to serve the UI and API
├── products.json   # Scraped data saved here
└── views/
    └── index.html  # Simple HTML UI to display products
```

---

## **Customization**

### Change Search Query
To scrape products for a different search term, modify the `scrapeEbayProducts` function call in `server.js`:
```javascript
await scrapeEbayProducts('nike'); // Replace 'nike' with your desired search query
```

### Adjust Pagination
By default, the scraper continues until no more products are found. You can limit the number of pages by adding a condition in `api.js`.

---

## **Troubleshooting**

### 1. **Empty `products.json`**
- Ensure the scraping process completes successfully.
- Check the console logs for errors during scraping.

### 2. **Timeout Errors**
- Increase the timeout in `page.goto()` if pages take too long to load:
  ```javascript
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
  ```

### 3. **Blocked by eBay**
- Use a custom `User-Agent` header (already included in the code).
- Add delays between requests to avoid detection:
  ```javascript
  await page.waitForTimeout(2000); // Wait 2 seconds
  ```

---

## **Contributing**

Feel free to contribute to this project by opening issues or submitting pull requests. Contributions are welcome!

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Acknowledgments**

- [Puppeteer Documentation](https://pptr.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [eBay](https://www.ebay.com/) for providing the data source.

---

## **Contact**

For questions or feedback, contact:
- Email: owaisraza3274@example.com
- GitHub: [Your GitHub Profile](https://github.com/raza2004)

---

This `README.md` file ensures that users understand how to set up and run the application, troubleshoot common issues, and customize the project as needed.

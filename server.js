const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create a route for rendering HTML from POST data
app.post('/preview', express.json(), (req, res) => {
    try {
        const { htmlContent } = req.body;
        res.send(htmlContent);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`HTML Editor server running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`)
})
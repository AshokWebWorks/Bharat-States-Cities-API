const express = require("express");
const path = require('path');
const rateLimit = require('express-rate-limit');
const router = require("./src/routes");
const app = express();
const port = 3000;



app.use(express.json());
// Set the view engine to EJS
app.use(express.static(path.join(__dirname, 'public')));
// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 60, // limit each IP to 60 requests per minutes
    message: {
        success: false,
        message: 'Rate limit exceeded',
        results: {},
        error: {
            code: 429, // Rate Limit Exceeded
            details: 'Too many requests from this IP.',
        },
    },
});

app.use(limiter);

// Route for the root endpoint
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Use the router for endpoints starting with "/v1/api"
app.use("/v1/api", router);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

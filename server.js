// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Function to validate date
function isValidDate(date) {
    return !isNaN(date.getTime());
}

// API route for date management
app.get('/api/:date?', (req, res) => {
    let date;

    if (!req.params.date) {
        date = new Date();
    } else if (!isNaN(req.params.date)) {
        date = new Date(parseInt(req.params.date));
    } else {
        date = new Date(req.params.date);
    }

    if (!isValidDate(date)) {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});

module.exports = app;

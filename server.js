// server.js

const express = require('express');
const cors = require('cors');
const os = require('os');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Fonction pour obtenir l'adresse IP locale
const getLocalIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
};

app.listen(port, () => {
    const ipAddress = getLocalIpAddress();
    console.log(`Serveur en écoute sur http://${ipAddress}:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Fonction pour valider la date
const estDateValide = (date) => !isNaN(date.getTime());

// Route API pour la gestion des dates
app.get('/api/:date?', (req, res) => {
    const { date: dateParam } = req.params;
    let date;

    if (!dateParam) {
        date = new Date();
    } else {
        const parsedDate = isNaN(dateParam) ? new Date(dateParam) : new Date(parseInt(dateParam));
        date = estDateValide(parsedDate) ? parsedDate : null;
    }

    if (!date) {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});

module.exports = app;

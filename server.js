// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});

// Route de base
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Route API pour la gestion des dates
app.get('/api/:date?', (req, res) => {
    let date;

    // Si aucun paramètre de date n'est fourni, utiliser la date actuelle
    if (!req.params.date) {
        date = new Date();
    } else {
        // Essayer de parser la date fournie
        date = new Date(req.params.date);

        // Si la date est invalide, retourner un message d'erreur
        if (isNaN(date.getTime())) {
            return res.json({ error: "Invalid Date" });
        }
    }

    // Retourner la date au format timestamp Unix et chaîne UTC
    res.json({
        unix: date.getTime(),  // Timestamp Unix en millisecondes
        utc: date.toUTCString()  // Format chaîne UTC
    });
});

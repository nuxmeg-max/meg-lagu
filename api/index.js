const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/search', async (req, res) => {
    const q = req.query.q;
    if (!q) return res.status(400).json([]);

    try {
        const response = await axios.get(`https://api.vreden.my.id/api/ytsearch?query=${encodeURIComponent(q)}`);
        const hasil = response.data.result || [];
        res.status(200).json(hasil);
    } catch (error) {
        console.error(error);
        res.status(500).json([]);
    }
});

module.exports = app;

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query kosong' });

    try {
        const response = await axios.get(`https://api.vreden.my.id/api/ytsearch?query=${encodeURIComponent(q)}`);
        // Pastikan kita mengirim array, bukan object kosong
        const results = response.data.result || [];
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'API_EXTERNAL_ERROR', msg: error.message });
    }
});

module.exports = app;

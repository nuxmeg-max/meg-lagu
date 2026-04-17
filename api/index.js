const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Query minimal 1 kata' });
    try {
        const response = await axios.get(`https://api.vreden.my.id/api/ytsearch?query=${query}`);
        res.json(response.data.result);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
});

module.exports = app;

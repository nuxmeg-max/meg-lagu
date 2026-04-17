const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint Search
app.get('/api/search', async (req, res) => {
    const query = req.query.q;

    // 1. Validasi Input agar tidak error saat query kosong
    if (!query || query.trim() === "") {
        return res.status(400).json({ 
            success: false, 
            message: 'Query minimal 1 kata' 
        });
    }

    try {
        // 2. Gunakan encodeURIComponent agar karakter spesial/spasi tidak bikin error
        const targetUrl = `https://api.vreden.my.id/api/ytsearch?query=${encodeURIComponent(query)}`;
        
        const response = await axios.get(targetUrl, {
            timeout: 10000 // Maksimal tunggu 10 detik agar tidak kena timeout Vercel
        });

        // 3. Pastikan data yang dikirim balik adalah array result
        const searchResults = response.data.result || [];
        
        res.status(200).json(searchResults);

    } catch (error) {
        // 4. Log error ke dashboard Vercel untuk debugging
        console.error("Backend Error:", error.message);
        
        res.status(500).json({ 
            success: false, 
            message: 'Gagal mengambil data dari API pusat' 
        });
    }
});

// 5. EKSPOR MODUL (WAJIB UNTUK VERCEL)
// Jangan gunakan app.listen() di sini!
module.exports = app;

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// TAMPILAN LANGSUNG DARI BACKEND SUPAYA GAK ERROR KONEKSI
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MEG_MUSIC_v4</title>
    <style>
        body { background: #000; color: #0f0; font-family: monospace; padding: 20px; }
        .container { max-width: 400px; margin: auto; border: 1px solid #333; padding: 15px; }
        .title { text-align: center; border-bottom: 2px solid #fff; padding-bottom: 10px; color: #fff; }
        input { background: #111; border: 1px solid #333; color: #fff; padding: 10px; width: 80%; margin-bottom:10px; }
        button { background: #fff; border: none; padding: 10px; cursor: pointer; font-weight: bold; width: 100%; }
        .track-card { display: flex; align-items: center; gap: 10px; border: 1px solid #222; padding: 10px; margin-top: 10px; }
        .track-card img { width: 60px; height: 60px; }
        .track-name { font-size: 11px; color: #fff; }
    </style>
</head>
<body>
    <div class="container">
        <h2 class="title">MEG_MUSIC_v4</h2>
        <input type="text" id="q" placeholder="Cari Lagu...">
        <button onclick="cari()">SEARCH_TRACK</button>
        <audio id="player" controls style="width:100%; margin-top:10px; filter:invert(1);"></audio>
        <div id="res"></div>
    </div>
    <script>
        async function cari() {
            const q = document.getElementById('q').value;
            const resDiv = document.getElementById('res');
            if(!q) return;
            resDiv.innerHTML = "MENCARI...";
            try {
                const r = await fetch('/api/search?q=' + encodeURIComponent(q));
                const data = await r.json();
                resDiv.innerHTML = "";
                data.forEach(t => {
                    const d = document.createElement('div');
                    d.className = 'track-card';
                    d.innerHTML = '<img src="'+t.thumbnail+'"><div class="track-info"><div class="track-name">'+t.title+'</div><button onclick="document.getElementById(\\'player\\').src=\\''+t.url+'\\'; document.getElementById(\\'player\\').play()">PLAY</button></div>';
                    resDiv.appendChild(d);
                });
            } catch(e) { resDiv.innerHTML = "ERROR_KONEKSI"; }
        }
    </script>
</body>
</html>
    `);
});

// MESIN PENCARI
app.get('/api/search', async (req, res) => {
    const q = req.query.q;
    try {
        const response = await axios.get('https://api.vreden.my.id/api/ytsearch?query=' + encodeURIComponent(q));
        res.json(response.data.result || []);
    } catch (e) {
        res.json([]);
    }
});

module.exports = app;

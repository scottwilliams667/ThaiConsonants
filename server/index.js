const express = require('express');
const cors = require('cors');
const storage = require('node-persist');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/store/words', async (req, res) => {
  const { key, value } = req.body;
  await storage.setItem(`tones:${key}`, value);
  res.json({ success: true });
});

// Get a value
app.get('/api/store/next/:dataset', async (req, res) => {
  
    const keys = await storage.keys();
    const filtered = keys.filter(k => k.startsWith(`${req.params.dataset}:`));

    if (keys.length === 0) return res.status(404).json({ error: 'No items in storage' });

    const randomKey = filtered[Math.floor(Math.random() * filtered.length)];
    const value = await storage.getItem(randomKey);

    res.json({ key: randomKey.split(':')[1], value });

});

app.get('/api/store/next/vocab', async (req, res) => {
  const keys = await storage.keys();
  const filtered = keys.filter(k => k.startsWith('vocab:'));

  if (filtered.length === 0) return res.status(404).json({ error: 'No items found' });

  const randomKey = filtered[Math.floor(Math.random() * filtered.length)];
  const value = await storage.getItem(randomKey);

  res.json({ key: randomKey.split(':')[1], value });
});

app.post('/api/store/vocab', async (req, res) => {
  const { key, value } = req.body;
  await storage.setItem(`vocab:${key}`, value);
  res.json({ success: true });
});


async function start() {
    await storage.init({dir: './data'});

    const keys = await storage.keys(); 

        const consonantsData = JSON.parse(fs.readFileSync('./consonants.json', 'utf-8'));
        const tonesData = JSON.parse(fs.readFileSync('./tones.json', 'utf-8'));
        const vocabData = JSON.parse(fs.readFileSync('./vocab.json', 'utf-8'));
        
        for (const [key, value] of Object.entries(consonantsData)) {
            await storage.setItem(key, value);
        }

        for (const [key, value] of Object.entries(tonesData)) {
            await storage.setItem(key, value);
        }

        for (const [key, value] of Object.entries(vocabData)) {
            await storage.setItem(key, value);
        }


}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    start(); 

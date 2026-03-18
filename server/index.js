const express = require('express');
const cors = require('cors');
const storage = require('node-persist');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.post('/api/store', async (req, res) => {
  const { key, value } = req.body;
  await storage.setItem(key, value);
  res.json({ success: true });
});

// Get a value
app.get('/api/store/next', async (req, res) => {
  
const keys = await storage.keys();

  if (keys.length === 0) return res.status(404).json({ error: 'No items in storage' });

  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const value = await storage.getItem(randomKey);

  res.json({ key: randomKey, value });

});

async function start() {
    await storage.init({dir: './data'});

    const keys = await storage.keys();

        const seedData = JSON.parse(fs.readFileSync('./consonants.json', 'utf-8'));
        
        for (const [key, value] of Object.entries(seedData)) {
        await storage.setItem(key, value);
        }

}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

start();

const express = require('express');
const fs = require('fs');
const app = express();

// ✅ declare once, environment-friendly
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let data = [];

app.post('/api/rfid_data', (req, res) => {
  const { tag, location } = req.body;
  const entry = {
    tag,
    location,
    timestamp: new Date().toISOString()
  };
  data.push(entry);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.send("Data received");
});

app.get('/api/rfid_data', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Needed to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(express.json());

app.post('/apply', (req, res) => {
  const formData = req.body;
  console.log('Received application:', formData);
  res.status(200).json({ message: 'Application received' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

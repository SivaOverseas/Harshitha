import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/apply', (req, res) => {
  try {
    const formData = req.body;

    const { name, email, phone, loan_type, loan_amount } = formData;
    if (!name || !email || !phone || !loan_type || !loan_amount) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    console.log('Received application:', formData);
    res.status(200).json({ message: 'Application received' });

  } catch (error) {
    console.error('Error in /apply route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

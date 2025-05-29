import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS setup
const allowedOrigins = [
  'https://sivaoverseas.com', 'https://www.sivaoverseas.com',
  'https://harshitha-9vb6.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/apply', (req, res) => {
  try {
    const formData = req.body;
    const { name, email, phone, loan_type, loan_amount } = formData;

    if (!name || !email || !phone || !loan_type || !loan_amount) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    console.log('✅ Received application:', formData);
    res.status(200).json({ message: 'Application received' });

  } catch (error) {
    console.error('❌ Error in /apply route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


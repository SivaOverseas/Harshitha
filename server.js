import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase config
const SUPABASE_URL = 'https://gyatbfarirtvqupmxbjr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_KEY) {
  throw new Error('Missing Supabase service key. Please check your .env file.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Allowed frontend domains
const allowedOrigins = ['https://sivaoverseas.com'];

// CORS middleware (must come before routes)
app.use(
  cors({
    origin: function (origin, callback) {
      console.log('CORS origin check:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

// Helmet for basic security (adjusted to allow CORS preflights)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Other middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.send('Siva Backend is live ✅');
});

// Loan application POST route
app.post('/apply', async (req, res) => {
  try {
    const { name, email, phone, loan_type, loan_amount } = req.body;

    if (!name || !email || !phone || !loan_type || !loan_amount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const { data, error } = await supabase.from('loan_applications').insert([
      {
        name,
        email,
        phone,
        loan_type,
        loan_amount: Number(loan_amount),
      },
    ]);

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return res.status(500).json({ message: 'Error saving application.' });
    }

    console.log('✅ Application saved to Supabase:', data);
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

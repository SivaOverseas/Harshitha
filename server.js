const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public')); // Serve static frontend files
app.use(express.json()); // Parse JSON body

// Endpoint to handle form submission
app.post('/apply', (req, res) => {
  const formData = req.body;
  console.log('Received application:', formData);

  // Here you can add logic to store in database, send email, etc.

  res.status(200).json({ message: 'Application received' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

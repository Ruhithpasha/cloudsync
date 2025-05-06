const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectCloudinary } = require('./cloudinary');
const app = require('./index');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Cloudinary
connectCloudinary();

// Routes
app.get('/', (req, res) => {
  res.send('CloudSync Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
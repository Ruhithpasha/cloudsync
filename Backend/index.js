const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const uploadRoutes = require('./routes/upload');
const restoreRoutes = require('./routes/restore');
const imagesRoutes = require('./routes/images');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/upload', uploadRoutes);
app.use('/restore', restoreRoutes);
app.use('/images', imagesRoutes);

module.exports = app;
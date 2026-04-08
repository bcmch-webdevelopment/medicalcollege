const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enable CORS
app.use(cors());

// Serve static files from uploads directory
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/facilities', require('./routes/facilityRoute'));
app.use('/api/aboutus', require('./routes/aboutUsRoute'));
app.use('/api/academic', require('./routes/academicRoute'));
app.use('/api/pages', require('./routes/pageRoute')); // unified dynamic pages

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

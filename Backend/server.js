const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // URL of your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Static file handling for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// API Routes
app.use('/api/users', authRoutes);
app.use('/api', classRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

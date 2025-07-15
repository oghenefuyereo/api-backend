require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Professional = require('./models/Professional');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/professional')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API Route to get professional data
app.get('/professional', async (req, res) => {
  try {
    // exclude _id and __v from the result
    const data = await Professional.findOne().select('-_id -__v');
    if (!data) return res.status(404).json({ message: "No data found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

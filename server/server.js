const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected safely to the MongoDB Atlas Cluster!'))
    .catch((err) => console.error('❌ Database connection error:', err));

app.use('/api/tickets', require('./src/routes/ticketRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "The backend server is awake and database is ready!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is officially running on http://localhost:${PORT}`);
});

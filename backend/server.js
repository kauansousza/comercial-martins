require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { protect } = require('./middleware/auth');
const { register, login } = require('./controllers/authController');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/users/register', register);
app.post('/api/users/login', login);

// Protected route example
app.get('/api/admin', protect, (req, res) => {
  res.json({ message: 'Welcome to admin panel' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
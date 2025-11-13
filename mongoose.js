// mongoose.js — robust connection with default URI + retry
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://mongo:27017/fitnessdb';

const connectWithRetry = () => {
  console.log('Attempting MongoDB connection to:', MONGO_URI);
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection failed. Retrying in 5s...', err && err.message ? err.message : err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

module.exports = mongoose;

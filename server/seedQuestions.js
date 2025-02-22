require('dotenv').config({ path: './.env' }); // Ensure .env is loaded from the current directory

console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("MONGODB_URL:", process.env.MONGODB_URL);

const mongoose = require('mongoose');
const Question = require('./models/Questions'); 
const questionsData = require('./seeds/questions.json');

// Use MONGODB_URI if defined, otherwise fallback to MONGODB_URL
const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!mongoURI) {
  console.error("Mongo URI is not defined. Check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return Question.insertMany(questionsData);
  })
  .then(() => {
    console.log('Questions imported successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Failed to import questions:', err);
    mongoose.disconnect();
  });

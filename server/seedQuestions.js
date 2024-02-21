const mongoose = require('mongoose');
const Question = require('./models/Questions'); 
const questionsData = require('./seeds/questions.json');
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI || 'mongodb://localhost:27017/quiz', { useNewUrlParser: true, useUnifiedTopology: true })
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

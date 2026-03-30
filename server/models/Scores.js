const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;

const mongoose = require("mongoose");

// Define the schema for the score
const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true // Makes the username field required
  },
  score: {
    type: Number,
    required: true // Makes the score field required
  }
});

// Create the model from the schema
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score; // Export the model
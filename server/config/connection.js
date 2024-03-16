require('dotenv').config(); // Load environment variables
const { connect, connection } = require("mongoose");

// Use the environment variable or provide a default for development
const mongoDBUri = process.env.MONGODB_URI || "mongodb://127.0.0.1/quiz";

connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;

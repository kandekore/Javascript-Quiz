require('dotenv').config(); // Load environment variables
const { connect, connection } = require("mongoose");

// Use the environment variable or provide a default for development
const mongoDBUri = process.env.MONGODB_URI || process.env.MONGO_URL; 

connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;

require('dotenv').config(); // Load environment variables
const { connect, connection } = require("mongoose");

const mongoDBUri = process.env.MONGODB_URI || process.env.MONGODB_URL; 
// now it checks for MONGODB_URL correctly

connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;
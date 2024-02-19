require('dotenv').config(); 
const { connect, connection } = require("mongoose");

const mongoDBUri = process.env.MONGODB_URI || "mongodb://127.0.0.1/quiz";

connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;

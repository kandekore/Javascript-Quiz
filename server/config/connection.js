require('dotenv').config(); 
const { connect, connection } = require("mongoose");

const mongoDBUri = process.env.MONGODB_URI;

connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;

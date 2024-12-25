// Import environment variables from .env file
require('dotenv').config();

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);
console.log('Loaded MONGODB_URL:', process.env.MONGODB_URL);

const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const mongoose = require('mongoose');




const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL; // Update this line
console.log("MongoDB URI:", mongoUri);
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB:', mongoose.connection.db.databaseName);
})
  .catch(err => console.error('Could not connect to MongoDB...', err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: false, 
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // The "catchall" handler for any request that doesn't match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

startApolloServer();

const Score = require('./models/Scores');

// POST endpoint to save a score
app.post('/api/scores', async (req, res) => {
    if (!req.body.username || req.body.score == null) {
        return res.status(400).json({ error: 'Missing username or score' });
    }
    try {
      const { username, score } = req.body;
      const newScore = new Score({ username, score });
      await newScore.save();
      res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
      console.error('Failed to save score:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// GET endpoint to fetch high scores
app.get('/api/scores/highscores', async (req, res) => {
    try {
        const highScores = await Score.find({}).sort({score: -1}).limit(10);
        res.json(highScores);
    } catch (error) {
        console.error("Failed to fetch high scores:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://0.0.0.0:${port}${server.graphqlPath}`);
});

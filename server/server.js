const express = require('express');
const cors = require('cors');
require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs'); 
const resolvers = require('./schemas/resolvers');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); 

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const Score = require('./models/Scores');

// REST endpoints
app.post('/api/scores', async (req, res) => {
    console.log(req.body);
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
  
  app.get('/api/scores/highscores', async (req, res) => {
    try {
        const highScores = await Score.find({}).sort({score: -1}).limit(10);
        res.json(highScores);
    } catch (error) {
        console.error("Failed to fetch high scores:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// Setup ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
});
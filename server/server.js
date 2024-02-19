const express = require('express');
const cors = require('cors');
require('./config/connection');
const bodyParser = require('body-parser');



const Score = require('./models/Scores');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// POST endpoint to save a score
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
  
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

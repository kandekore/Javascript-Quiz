const Question = require('../models/Questions');
const Score = require('../models/Scores');

// In-memory rate limit store for GraphQL addScore mutation
const graphqlRateLimitStore = new Map();

function checkGraphQLRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const max = 5;
  const timestamps = (graphqlRateLimitStore.get(ip) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= max) return false;
  timestamps.push(now);
  graphqlRateLimitStore.set(ip, timestamps);
  return true;
}

const resolvers = {
  Query: {
    highScores: async () => {
      return await Score.find({}).sort({ score: -1 });
    },
    questions: async () => {
      return await Question.find({});
    },
  },
  Mutation: {
    addScore: async (_, { username, score }, { clientIp }) => {
      if (!checkGraphQLRateLimit(clientIp)) {
        throw new Error('Too many score submissions. Please try again in 15 minutes.');
      }
      const cleanUsername = String(username).trim().slice(0, 30);
      const cleanScore = Number(score);
      if (!cleanUsername || isNaN(cleanScore) || cleanScore < 0 || cleanScore > 100) {
        throw new Error('Invalid username or score');
      }
      const newScore = new Score({ username: cleanUsername, score: cleanScore });
      await newScore.save();
      return newScore;
    },
  },
};

module.exports = resolvers;

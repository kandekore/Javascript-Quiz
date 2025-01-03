const Question = require('../models/Questions');
const Score = require('../models/Scores'); 
const resolvers = {
  Query: {

    highScores: async () => {
      return await Score.find({}).sort({ score: -1 }); 
    },
    // questions: async () => {
    //   return await Question.find({});
    // }
    questions: async () => {
      const allQuestions = await Question.find({});
     // console.log('Fetched questions from database:', allQuestions);
      return allQuestions;
    },
    
  },
  Mutation: {
    addScore: async (_, { username, score }) => {
      const newScore = new Score({ username, score });
      await newScore.save();
      return newScore;
    },
  },
};

module.exports = resolvers;

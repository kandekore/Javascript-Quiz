

const resolvers = {
  Query: {
  
    highScores: async (_, __, { dataSources }) => {
      return dataSources.scoreAPI.getHighScores();
    },
  },
  Mutation: {
    addScore: async (_, { username, score }, { dataSources }) => {
      return dataSources.scoreAPI.addScore({ username, score });
    },
  },
};

module.exports = resolvers;
 
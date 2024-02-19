const { typeDefs } = require("graphql");

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Score {
    id: ID!
    username: String!
    score: Int!
  }

  type Query {
    highScores: [Score]!
  }

  type Mutation {
    addScore(username: String!, score: Int!): Score
  }
`;

module.exports = typeDefs;

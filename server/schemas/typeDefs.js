const { gql } = require('apollo-server');

const typeDefs = gql`
  type Score {
    id: ID!
    username: String!
    score: Int!
  }
  type Answer {
    text: String!
    correct: Boolean!
  }

  type Question {
    id: ID!
    question: String!
    answers: [Answer!]!
    explanation: String!
  }

  type Query {
    highScores: [Score]!
    questions: [Question!]!
  }

  type Mutation {
    addScore(username: String!, score: Int!): Score
  }
`;

module.exports = typeDefs;

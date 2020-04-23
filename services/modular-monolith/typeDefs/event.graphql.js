const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    event(id: ID!): Event
  }

  type Event {
    id: ID!
    title: String
    host: Member
  }
`;

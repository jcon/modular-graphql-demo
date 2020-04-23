const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    event(id: ID!): Event
  }

  type Event {
    id: ID!
    title: String
    host: Member

    rsvps: [Rsvp]
  }
`;

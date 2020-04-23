const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    rsvp(id: String!): Event
  }

  type Rsvp {
    id: ID!
    member: Member!
    event: Event!
  }

  extend type Member {
    rsvps: [Rsvp]
  }

  extend type Event {
    rsvps: [Rsvp]
  }
`;

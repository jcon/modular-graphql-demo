const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    me: Member
    member(id: ID!): Member
  }

  type Member {
    id: ID!
    name: String
    email: String
    photoUrl: String
  }
`;

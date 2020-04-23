const { gql } = require('apollo-server');

const { memberService, memberLoader } = require('./service');

const typeDefs = gql`
  extend type Query {
    me: Member
  }

  type Member @key(fields: "id") {
    id: ID!
    name: String
    email: String
    photoUrl: String
  }
`;

const load = ({ members }, memberId) =>
  process.env.USE_LOADERS === 'true' ? members.load(memberId) : memberService.get(memberId);

const resolvers = {
  Query: {
    me: () => memberService.get('1')
  },
  Member: {
    __resolveReference: (object, { loaders }) => load(loaders, object.id)
  }
};

module.exports = {
  memberLoader,
  memberService,
  typeDefs,
  resolvers
};

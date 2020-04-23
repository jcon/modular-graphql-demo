const { gql } = require('apollo-server');

const { rsvpService, rsvpLoader } = require('./service');

const typeDefs = gql`
  extend type Query {
    rsvp(id: String!): Event
  }

  type Rsvp @key(fields: "id") {
    id: ID!
    member: Member! @provides(fields: "id")
    event: Event! @provides(fields: "id")
  }

  extend type Member @key(fields: "id") {
    id: ID! @external
    rsvps: [Rsvp]
  }

  extend type Event @key(fields: "id") {
    id: ID! @external
    rsvps: [Rsvp]
  }
`;

const load = ({ rsvps: rsvpLoader }, rsvpId) =>
  process.env.USE_LOADERS === 'true' ? rsvpLoader.load(rsvpId) : rsvpService.get(rsvpId);

const resolvers = {
  Query: {
    rsvp: (_, args) => rsvpService.get(args.id),
  },
  Rsvp: {
    __resolveReference: (object, { loaders }) => load(loaders, object.id),
  },
  Member: {
    rsvps: async ({ id }) => rsvpService.getRsvpsForUser(id),
  },
  Event: {
    rsvps: async ({ id }) => rsvpService.getRsvpsForEvent(id),
  }
};

module.exports = {
  rsvpLoader,
  rsvpService,
  typeDefs,
  resolvers
};

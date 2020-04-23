const { gql } = require('apollo-server');

const { eventService, eventLoader } = require('./service');

const typeDefs = gql`
  extend type Query {
    event(id: ID!): Event
  }

  type Event @key(fields: "id") {
    id: ID!
    title: String
    host: Member
  }

  extend type Member @key(fields: "id") {
    id: ID! @external
  }
`;

const load = ({ events }, eventId) =>
  process.env.USE_LOADERS === 'true' ? events.load(eventId) : eventService.get(eventId);

const resolvers = {
  Query: {
    event: (_, args, { loaders }) => load(loaders, args.id)
  },
  Event: {
    __resolveReference: (object, { loaders }) => load(loaders, object.id)
  },
  Member: {
    rsvps: ({ id }) => eventService.getRsvpsForUser(id)
  }
};

module.exports = {
  eventLoader,
  eventService,
  typeDefs,
  resolvers
};

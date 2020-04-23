const { rsvpService } = require('@meetup/rsvp');

const resolvers = {
  Query: {
    rsvp: (_, args) => rsvpService.get(args.id)
  },
  Member: {
    rsvps: ({ id }) => rsvpService.getRsvpsForUser(id)
  },
  Event: {
    rsvps: ({ id }) => rsvpService.getRsvpsForEvent(id)
  }
};

module.exports = resolvers;

const { eventService } = require('@meetup/event');
const { rsvpService } = require('@meetup/rsvp');

const resolvers = {
  Query: {
    event: (_, args) => eventService.get(args.id)
  },
  Event: {
    rsvps: ({ id }) => rsvpService.getRsvpsForEvent(id)
  }
};

module.exports = resolvers;

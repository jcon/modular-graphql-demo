const { eventService } = require('@meetup/event');

const resolvers = {
  Query: {
    event: (_, args) => eventService.get(args.id)
  },
  Rsvp: {
    event: ({ event: { id: eventId } }) =>
      eventService.get(eventId)
  }
};

module.exports = resolvers;

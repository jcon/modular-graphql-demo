const { eventService } = require('@meetup/event');
const { rsvpService } = require('@meetup/rsvp');
const { memberService } = require('@meetup/member');

const resolvers = {
  Query: {
    rsvp: (_, args) => rsvpService.get(args.id)
  },
  Rsvp: {
    member: ({ member: { id: memberId } }) =>
      memberService.get(memberId),
    event: ({ event: { id: eventId } }) =>
      eventService.get(eventId),
  }
};

module.exports = resolvers;

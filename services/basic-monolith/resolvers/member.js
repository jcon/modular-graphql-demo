const { memberService } = require('@meetup/member');
const { rsvpService } = require('@meetup/rsvp');

const resolvers = {
  Query: {
    me: () => memberService.get('1'),
    member: (_, args) => memberService.get(args.id)
  },
  Member: {
    rsvps: ({ id }) => rsvpService.getRsvpsForUser(id)
  }
};

module.exports = resolvers;

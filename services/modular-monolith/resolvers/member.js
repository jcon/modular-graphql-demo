const { memberService } = require('@meetup/member');

const resolvers = {
  Query: {
    me: () => memberService.get('1'),
    member: (_, args) => memberService.get(args.id)
  },
  Rsvp: {
    member: ({ member: { id: memberId } }) => memberService.get(memberId)
  }
};

module.exports = resolvers;

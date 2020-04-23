const { mergeTypes } = require('merge-graphql-schemas');

const member = require('./member.graphql');
const event = require('./event.graphql');
const rsvp = require('./rsvp.graphql');

module.exports = mergeTypes(
  [
    member,
    event,
    rsvp
  ],
  {
    all: true
  }
);

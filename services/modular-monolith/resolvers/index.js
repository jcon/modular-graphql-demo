const { merge } = require('lodash');

const event = require('./event');
const member = require('./member');
const rsvp = require('./rsvp');

module.exports = merge({}, event, member, rsvp);

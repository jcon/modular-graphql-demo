
const DataLoader = require('dataloader');
const faker = require('faker');
const { range, random } = require('lodash');

const { DataService } = require('data-service');

function fakeText (max) {
  const title = faker.hacker.phrase().toString().substring(0, max);
  const chunks = title.split(' ');
  return chunks.slice(0, chunks.length - 2).join(' ');
}

const events = range(1, 101).map(id => {
  return {
    id: id.toString(),
    title: fakeText(48),
    rsvps: range(1, random(4, 30, false)).map(() => ({
      id: faker.random.number().toString(),
      member: {
        id: faker.random.number({ min: 1, max: 100 }).toString()
      },
      event: {
        id: id.toString()
      }
    })),
    host: {
      id: faker.random.number({ min: 1, max: 100 })
    }
  };
});

class EventService extends DataService {
  constructor (data) {
    super('Event', 'id', data);
  }
}

const eventService = new EventService(events);

const eventLoader = () => new DataLoader(ids => eventService.batchGet(ids));

module.exports = {
  eventLoader,
  eventService
};

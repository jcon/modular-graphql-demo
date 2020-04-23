
const DataLoader = require('dataloader');
const faker = require('faker');
const { range } = require('lodash');

const { DataService } = require('data-service');

const members = range(1, 101).map(id => ({
  id: id.toString(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  photoUrl: faker.internet.avatar()
}));

const memberService = new DataService('Member', 'id', members);

const memberLoader = () => new DataLoader(ids => memberService.batchGet(ids));

module.exports = {
  memberLoader,
  memberService
};

const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const { rsvpLoader } = require('./service');
const { typeDefs, resolvers } = require('./index');

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ]),
  context: ({ req }) => {
    if (process.env.DEBUG === 'true') {
      console.log(JSON.stringify(req.body, null, 2));
    }
    return {
      loaders: {
        rsvps: rsvpLoader()
      }
    };
  }
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 rsvp server ready at ${url}`);
});

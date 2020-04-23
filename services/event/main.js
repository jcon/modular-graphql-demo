const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const { eventLoader } = require('./service');
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
        events: eventLoader()
      }
    };
  }
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 events server ready at ${url}`);
});

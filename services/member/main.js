const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const { memberLoader } = require('./service');
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
        members: memberLoader()
      }
    };
  }
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 members server ready at ${url}`);
});

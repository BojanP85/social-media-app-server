const { ApolloServer } = require("apollo-server");
// const { PubSub } = require('graphql-subscriptions'); // 'Subscription' part
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

// const pubsub = new PubSub(); // 'Subscription' part

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  // context: ({ req }) => ({ req, pubsub }) // 'Subscription' part
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }) // 'useNewUrlParser' and 'useUnifiedTopology' options take care of the deprecation warnings inside terminal.
  .then(() => {
    console.log("Connected to MongoDB");
    return server.listen({ port: PORT });

    // alternative syntax
    /*
    return server.listen(5000, () => {
      console.log('Connected to MongoDB');
    });
    */
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });

const {ApolloServer} = require("apollo-server");

const resolvers = require("./_resolvers");
const typeDefs = require("./_typeDefs");

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`gql server up on ${url}`);
});

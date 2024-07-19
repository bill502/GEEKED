import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co', // Anilist GraphQL API endpoint
  cache: new InMemoryCache()
});

export default client;

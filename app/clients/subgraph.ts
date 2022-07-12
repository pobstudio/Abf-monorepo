import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SUBGRAPH_LINK } from '../constants';

export const subgraphClient = new ApolloClient({
  uri: SUBGRAPH_LINK,
  cache: new InMemoryCache(),
});

import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { NextPageContext } from 'next';
import { createWithApollo } from './create-with-apollo';

const httpLink = new HttpLink({
  uri: 'http://localhost:3333/graphql',
  credentials: 'include',
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: 'ws://localhost:3333/graphql',
      options: {
        reconnect: true,
      },
    })
  : null;

// const authLink = setContext(async (_, { headers }) => {
//   // const accessToken = await getAccessToken();
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; accessToken=`);
//   const accessToken =
//     parts.length === 2 ? parts.pop().split(';').shift() : null;

//   return {
//     headers: {
//       ...headers,
//       authorization: accessToken ? `Bearer ${accessToken}` : '',
//     },
//   };
// });
const splitLink =
  typeof window === 'undefined'
    ? httpLink
    : split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      );

export const createClient = (ctx: NextPageContext) => {
  return new ApolloClient({
    link: from([splitLink]),
    cache: new InMemoryCache({}),
    credentials: 'include',
  });
};

export const withApollo = createWithApollo(createClient);

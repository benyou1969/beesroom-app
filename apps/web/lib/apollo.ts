import {
  HttpLink,
  split,
  ApolloClient,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = process.browser
  ? new WebSocketLink({
      uri: 'ws://localhost:3333/graphql',
      options: {
        reconnect: true,
      },
    })
  : null;

const httpLink = new HttpLink({
  uri: 'http://localhost:3333/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: from([authLink, link]),
  // link: from([link]),
  cache: new InMemoryCache(),
  credentials: 'include',
});

// export function initializeApollo(initialState = null) {
//   const _apolloClient = apolloClient ?? createApolloClient();

//   // If your page has Next.js data fetching methods that use Apollo Client, the initial state
//   // get hydrated here
//   if (initialState) {
//     // Get existing cache, loaded during client side data fetching
//     const existingCache = _apolloClient.extract();
//     // Restore the cache using the data passed from getStaticProps/getServerSideProps
//     // combined with the existing cached data
//     _apolloClient.cache.restore({ ...existingCache, ...initialState });
//   }
//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === 'undefined') return _apolloClient;
//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;

//   return _apolloClient;
// }

// export function useApollo(initialState) {
//   const store = useMemo(() => initializeApollo(initialState), [initialState]);
//   return store;
// }

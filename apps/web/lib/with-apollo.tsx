// import withApollo from 'next-with-apollo';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   from,
//   HttpLink,
//   split,
// } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3333/graphql',
//   credentials: 'include',
// });

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: 'ws://localhost:3333/graphql',
//       options: {
//         reconnect: true,
//       },
//     })
//   : null;

// export const splitLink =
//   typeof window === 'undefined'
//     ? httpLink
//     : split(
//         ({ query }) => {
//           const definition = getMainDefinition(query);
//           return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//           );
//         },
//         wsLink,
//         httpLink
//       );

// export default withApollo(
//   ({ initialState }) => {
//     return new ApolloClient({
//       ssrMode: typeof window === 'undefined',
//       link: from([splitLink]),
//       credentials: 'include',
//       cache: new InMemoryCache().restore(initialState || {}),
//     });
//   },
//   {
//     render: ({ Page, props }) => {
//       return (
//         <ApolloProvider client={props.apollo}>
//           <Page {...props} />
//         </ApolloProvider>
//       );
//     },
//   }
// );

import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client';
import NextApp, { AppProps } from 'next/app';
import withApollo, { InitApolloOptions } from '@sotnikov/next-with-apollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const httpLink = new HttpLink({
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

export const splitLink =
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
        httpLink,

      );

type Props = AppProps & {
  apollo: ApolloClient<{}>;
};

const App = ({ Component, pageProps, apollo }: Props) => (
  <ApolloProvider client={apollo}>
    <Component {...pageProps} />
  </ApolloProvider>
);

App.getInitialProps = async (appContext: any) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(
  ({ initialState }: InitApolloOptions<any>): ApolloClient<any> => {
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: from([splitLink]),
      credentials: 'include',
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  { getDataFromTree }
)(App);

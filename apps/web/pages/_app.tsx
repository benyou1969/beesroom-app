import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
  ApolloLink,
  Observable,
  HttpLink,
} from '@apollo/client';
import NextApp, { AppProps } from 'next/app';
import withApollo, { InitApolloOptions } from '@sotnikov/next-with-apollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import theme from '../lib/theme';
import './styles.css';
import { splitLink, httpLink } from '../lib/with-apollo';
import { setAccessToken, getAccessToken } from '../utils/access-token';
import { onError } from '@apollo/client/link/error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';
import { GetServerSideProps } from 'next';

type Props = AppProps & {
  apollo: ApolloClient<{}>;
};

const App = ({ Component, pageProps, apollo }: Props) => {
  useEffect(() => {
    fetch('http://localhost:3333/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (data) => {
      const { jid } = await data.json();
      setAccessToken(jid);
      console.log(jid);
    });
  }, []);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Bees Room</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <div>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </div>
    </>
  );
};

App.getInitialProps = async (appContext: any) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};

// const authLink = setContext((_, { headers }) => {
//   const getToken = () => {
//     const token = getAccessToken();

//     return token ? `Bearer ${token}` : '';
//   };
//   return {
//     headers: {
//       ...headers,
//       authorization: getToken(),
//     },
//   };
// });

// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable((observer) => {
//       let handle: any;
//       const getToken = () => {
//         const token = getAccessToken();
//         return token ? `Bearer ${token}` : '';
//       };
//       Promise.resolve(operation)
//         .then((operation) => {
//           if (getToken) {
//             operation.setContext({
//               headers: {
//                 authorization: getToken,
//               },
//             });
//           }
//         })
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer),
//           });
//         })
//         .catch(observer.error.bind(observer));

//       return () => {
//         if (handle) handle.unsubscribe();
//       };
//     })
// );

export default withApollo(
  ({ initialState }: InitApolloOptions<any>): ApolloClient<any> => {
    return new ApolloClient({
      link: from([
        new TokenRefreshLink({
          accessTokenField: 'accessToken',
          isTokenValidOrUndefined: () => {
            const token = () => {
              const token = getAccessToken();
              return token;
            };

            if (!token) {
              return true;
            }

            try {
              const { exp } = jwtDecode(token);
              if (Date.now() >= exp * 1000) {
                return false;
              } else {
                true;
              }
            } catch {
              return false;
            }
          },
          fetchAccessToken: () => {
            return fetch('http://localhost:3333/api/auth/refresh-token', {
              method: 'POST',
              credentials: 'include',
            });
          },
          handleFetch: (accessToken) => {
            setAccessToken(accessToken);
          },
          handleError: (err) => {
            // full control over handling token fetch Error
            console.warn('Your refresh token is invalid. Try to relogin');
            console.error(err);
          },
        }) as any,
        // requestLink,
        // authLink,
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            );

          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        splitLink,
      ]),
      cache: new InMemoryCache().restore(initialState || {}),
      credentials: 'include',
      // ssrMode: true,
    });
  },
  { getDataFromTree }
)(App);

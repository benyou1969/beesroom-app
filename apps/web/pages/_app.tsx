import { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import NextApp, { AppProps } from 'next/app';
import withApollo, { InitApolloOptions } from '@sotnikov/next-with-apollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import theme from '../lib/theme';
import './styles.css';
import { splitLink } from '../lib/with-apollo';
import Cookies from 'universal-cookie';

type Props = AppProps & {
  apollo: ApolloClient<{}>;
};

// const CustomApp = ({ Component, pageProps }: AppProps, { apollo }) => {
//   useEffect(() => {
//     const jssStyles = document.querySelector('#jss-server-side');
//     if (jssStyles) {
//       jssStyles.parentElement!.removeChild(jssStyles);
//     }
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>Bees Room</title>
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width"
//         />
//       </Head>
//       <div>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Component {...pageProps} />
//         </ThemeProvider>
//       </div>
//     </>
//   );
// };

// export default CustomApp;

const App = ({ Component, pageProps, apollo }: Props) => {
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

export default withApollo(
  ({
    initialState,
    ctx,
    headers,
  }: InitApolloOptions<any>): ApolloClient<any> => {
    const cookies = new Cookies(!process.browser ? headers.cookie : null);

    return new ApolloClient({
      link: from([splitLink]),
      cache: new InMemoryCache().restore(initialState || {}),
      credentials: 'include',
    });
  },
  { getDataFromTree }
)(App);

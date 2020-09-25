import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../lib/theme';
import './styles.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect } from 'react';
// import { useApollo } from '../lib/apollo';
// import { ApolloProvider } from '@apollo/client';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // const apolloClient = useApollo(pageProps.initialApolloState);

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
        {/* <ApolloProvider client={apolloClient}> */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        {/* </ApolloProvider> */}
      </div>
    </>
  );
};

export default CustomApp;

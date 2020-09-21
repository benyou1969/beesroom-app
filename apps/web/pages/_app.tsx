import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  ThemeProvider,
} from '@material-ui/core/styles';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import theme from '../lib/theme';
import './styles.css';


const CustomApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>Bees Room</title>
      </Head>
      <div className="app">
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </div>
    </>
  );
};

export default CustomApp;

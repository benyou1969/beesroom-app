import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from './create-with-apollo';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({}),
  });

export const withApollo = createWithApollo(createClient);

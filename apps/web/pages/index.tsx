import { GetServerSideProps } from 'next';
import React from 'react';
import {
  HelloDocument,
  useCurrentUserQuery,
  useHelloQuery,
} from '../generated/graphql';
import cookie from 'cookie';
import { useApollo } from '../lib/apollo';
import { ApolloClient } from '@apollo/client';
// import { getServerSideProps } from './private';
const Index = ({ data1 }) => {
  const { data, error } = useHelloQuery({ ssr: true });
  // const { error: AuthError, data: authData } = useCurrentUserQuery();
  // if (AuthError) console.log(AuthError);
  // if (!data) return null;
  // if (authData) {
  //   return <div>{authData.currentUser.id}</div>;
  // }
  return <div>{data}</div>;
};
export const getServerSideProps = async (context) => {
  if (context.req) {
    const cookies = cookie.parse(context.req.headers.cookie);
    context.req.headers.authorization = `Bearer ${cookies.jid}`;
  }
  const { data } = await context.apolloClient.query({
    query: HelloDocument,
  });
  console.log(data);
  return {
    props: {
      data,
      apolloState: {
        data: context.apolloClient.cache.extract(),
      },
    },
  };
};
export default Index;

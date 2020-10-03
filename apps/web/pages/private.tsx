// import { ApolloClient } from '@apollo/client';
// import { createClient } from 'http';
// import { useRouter } from 'next/router';
// import {
//   CurrentUserDocument,
//   CurrentUserQuery,
//   HelloDocument,
//   HelloQuery,
//   useCurrentUserQuery,
// } from '../generated/graphql';
// import { initializeApollo } from '../lib/apollo';
// import { getDataFromTree } from '@apollo/client/react/ssr';
// import withApollo from '../lib/with-apollo';

// const Private = ({ data1 }) => {
//   const router = useRouter();

//   const { loading, error, data } = useCurrentUserQuery();

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     if (error.message === 'unauthorized') {
//       console.log(error);
//       return router.push('/');
//     }
//   }
//   return <div>{data.currentUser.email} </div>;
// };

// // export const getInitialProps = async (ctx) => {
// export const getServerSideProps = async (context) => {
//   // console.log(context.req.headers);
//   // const apolloClient: ApolloClient<HelloQuery> = initializeApollo();
//   // const response = await apolloClient.query({
//   //   query: HelloDocument,
//   // });
//   // console.log(response);

//   // Fetch data from external API
//   const res = await fetch(`http://jsonplaceholder.typicode.com/users`);
//   const data1 = await res.json();
//   // Pass data to the page via props
//   return { props: { data1 } };
// };

import { gql, useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { CurrentUserDocument, useCurrentUserQuery, useHelloQuery } from '../generated/graphql';
import withApollo from '../lib/with-apollo';
import App from 'next/app';
import { useRouter } from 'next/router';
import Index from '.';

const Private = ({ data1 }) => {
  const router = useRouter();

  const { data, loading, error } = useHelloQuery();
  const {
    loading: authLoading,
    error: AuthError,
    data: authData,
  } = useCurrentUserQuery();

  if (loading) {
    return <h2>loading...</h2>;
  }
  if (error) {
    console.log(error);
  }
  if (authData) {
    console.log(authData.currentUser);
  }
  if (error) {
    if (error.message === 'unauthorized') {
      console.log(error);
      return router.push('/');
    }
  }

  return <div>{data.hello}</div>;

};


// export const getInitialProps = async (ctx) => {
export const getServerSideProps = async (ctx) => {
  // console.log(context.req.headers);
  // const apolloClient: ApolloClient<HelloQuery> = initializeApollo();
  const response = await ctx.apolloClient.query({
    query: CurrentUserDocument,
  });
  // console.log(response);

  // console.log(apolloClient);
  // Fetch data from external API
  const res = await fetch(`http://jsonplaceholder.typicode.com/users`);
  const data1 = await res.json();
  // Pass data to the page via props
  return { props: { data1 } };
};

export default Private;

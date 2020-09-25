import { ApolloClient } from '@apollo/client';
import { createClient } from 'http';
import { useRouter } from 'next/router';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  HelloDocument,
  HelloQuery,
  useCurrentUserQuery,
} from '../generated/graphql';
import { initializeApollo } from '../lib/apollo';
import { withApollo } from '../utils/with-apollo';

const Private = ({ data1 }) => {
  const router = useRouter();

  const { loading, error, data } = useCurrentUserQuery();
  withApollo;
  if (loading) return <p>Loading...</p>;
  if (error.message === 'unauthorized') {
    console.log(error);
    return router.push('/');
  }
  return (
    <div>
      {JSON.stringify(data)} {JSON.stringify(data1)}{' '}
    </div>
  );
};

// export const getInitialProps = async (ctx) => {
export const getServerSideProps = async (context) => {
  // const apolloClient: ApolloClient<HelloQuery> = initializeApollo();
  // const response = await apolloClient.query({
  //   query: HelloDocument,
  // });
  // console.log(response);

  // Fetch data from external API
  const res = await fetch(`http://jsonplaceholder.typicode.com/users`);
  const data1 = await res.json();
  // Pass data to the page via props
  return { props: { data1 } };
};

export default withApollo({ ssr: true })(Private);

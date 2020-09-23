import { gql, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apollo';

const TEST_QUERY = gql`
  query {
    hello
  }
`;

function Page({ data }) {
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: TEST_QUERY,
  });

  return {
    props: {
      data: apolloClient.cache.extract(),
    },
  };
};

export default Page;

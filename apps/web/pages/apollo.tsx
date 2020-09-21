import { initializeApollo } from '../lib/apollo';
import Layout from '../components/Layout';

const ApolloPage = () => (
  <Layout>
    <h2>Hello</h2>
  </Layout>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    // query: ALL_POSTS_QUERY,
    // variables: allPostsQueryVars,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default ApolloPage;

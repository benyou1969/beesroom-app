
import { withApollo } from '../lib/with-apollo';
import { useHelloQuery } from '../generated/graphql';

// const TEST_QUERY = gql`
//   query {
//     hello
//   }
// `;

// function Page({ data }) {
//   return (
//     <div>
//       {JSON.stringify(data)}
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//   await apolloClient.query({
//     query: TEST_QUERY,
//   });

//   return {
//     props: {
//       data: apolloClient.cache.extract(),
//     },
//   };
// };

// export default Page;

function Page() {
  const { data, loading } = useHelloQuery();
  if (loading) return <h2>loading...</h2>;
  return <div>{JSON.stringify(data)}</div>;
}

export default withApollo({ ssr: true })(Page);

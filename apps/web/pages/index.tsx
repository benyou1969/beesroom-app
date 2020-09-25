import { gql, useQuery } from '@apollo/client';
import { useCurrentUserQuery, useHelloQuery } from '../generated/graphql';
import { withApollo } from '../utils/with-apollo';

const Index = () => {
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

  return <div>{JSON.stringify(data.hello)}</div>;
};

export default withApollo({ ssr: true })(Index);

import { gql, useQuery } from '@apollo/client';

const HELLO_QUERY = gql`
  {
    hello
  }
`;
const GET_CURRENT_USER = gql`
  query {
    currentUser {
      username
      email
      isOnline
    }
  }
`;

const Index = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  const { loading: authLoading, error: AuthError, data: authData } = useQuery(
    GET_CURRENT_USER
  );

  if (loading) {
    return <h2>loading...</h2>;
  }
  if (error) {
    console.log(error);
  }
  if (authData) {
    console.log(authData.currentUser.username);
  }

  return <div>{JSON.stringify(data.hello)}</div>;
};

export default Index;

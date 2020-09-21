import { gql, useQuery } from '@apollo/client';

const HELLO_QUERY = gql`
  {
    hello
  }
`;

const Index = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) {
    return <h2>loading...</h2>;
  }
  if (error) {
    console.log(error);
  }
  return <div>{JSON.stringify(data.hello)}</div>;
};

export default Index;

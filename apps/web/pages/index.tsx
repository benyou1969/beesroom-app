import { GetServerSideProps } from 'next';
import { useCurrentUserQuery, useHelloQuery } from '../generated/graphql';

const Index = () => {
  const { data, loading, error } = useHelloQuery();
  const {
    loading: authLoading,
    error: AuthError,
    data: authData,
  } = useCurrentUserQuery();

  if (error) {
    console.log(error);
  }
  if (authData) {
    console.log(authData.currentUser);
  }

  if (loading) return <h2>loading...</h2>;

  return <div>{data.hello}</div>;
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx);
  return {
    props: {},
  };
};

export default Index;

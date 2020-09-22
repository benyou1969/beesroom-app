import { useRouter } from 'next/router';

import { gql, useQuery } from '@apollo/client';

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      username
    }
  }
`;

const Private = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) {
    router.push('/login');
  }
  return <div>Hello</div>;
};

export default Private;

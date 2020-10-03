let accessToken = '';

export const setAccessToken = (s: string) => {
  console.log(`beforeSetAccessToken: \n`, accessToken);
  accessToken = s;
  console.log(`afterSetAccessToken: \n`, accessToken);
};

export const getAccessToken = () => {
  console.log(`GetAccessToken: `, accessToken);
  return accessToken;
};

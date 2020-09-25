export const setAccessToken = (s: string) => {
  document.cookie = `accessToken=${s}`;
};

export const getAccessToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

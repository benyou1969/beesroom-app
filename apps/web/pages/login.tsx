import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import {
  Card,
  TextField,
  Container,
  CardContent,
  Grid,
  Button,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { Email, KeyboardArrowRight, Lock } from '@material-ui/icons';
import { Formik, Field } from 'formik';

const LOGIN_CREDENTIALS = gql`
  mutation($email: String!, $password: String!) {
    signIn(authSignInInput: { email: $email, password: $password }) {
      user {
        createdAt
        email
        username
      }
      accessToken
    }
  }
`;

const Login = () => {
  const router = useRouter();

  const [login, { error: mutationError, data }] = useMutation(
    LOGIN_CREDENTIALS
  );

  if (data) {
    const { signIn } = data;
    const saveToken = async () => {
      return await localStorage.setItem('accessToken', signIn.accessToken);
    };
    saveToken();
    if (signIn) {
      router.push('/');
    } else {
      return null;
    }
  }

  return (
    <>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Container maxWidth="xs">
            <Card>
              <CardContent>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={async ({ email, password }, { setSubmitting }) => {
                    setSubmitting(true);
                    const accessToken = await login({
                      variables: { email, password },
                    }).catch((err) => console.log(err));
                    setSubmitting(false);
                  }}
                >
                  {({ handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={12}>
                          <Field
                            name="email"
                            id="email"
                            type="email"
                            as={TextField}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            type="password"
                            as={TextField}
                            variant="outlined"
                            fullWidth
                            required
                            label="Password"
                            placeholder="*********"
                            name="password"
                            id="password"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <pre>
                        {mutationError ? (
                          <span> {mutationError.message}</span>
                        ) : null}
                      </pre>
                      <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                      >
                        Login <KeyboardArrowRight />
                      </Button>
                    </form>
                  )}
                </Formik>
                <Typography
                  variant="caption"
                  gutterBottom
                  align="center"
                  style={{
                    margin: `0 5px`,
                  }}
                >
                  <Link href="/signup">
                    <a>Create an Account</a>
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </div>
    </>
  );
};

export default Login;

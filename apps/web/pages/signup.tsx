import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Card,
  TextField,
  Container,
  CardContent,
  Grid,
  Button,
  makeStyles,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { Email, KeyboardArrowRight, Lock } from '@material-ui/icons';
import { Formik, Field } from 'formik';
import { gql, useQuery } from '@apollo/client';
import { useCurrentUserQuery, useSignUpMutation } from '../generated/graphql';

const useStyles = makeStyles((theme) => ({
  bodyBackGround: {
    background: `url(https://products.ls.graphics/paaatterns/images/027-p-2000.png)`,
    backgroundSize: `cover`,
    minHeight: '100vh',
  },
}));

const SignUp = () => {
  const router = useRouter();

  const classes = useStyles();
  const [signup, { error: mutationError, data }] = useSignUpMutation();
  const { error, data: authData, loading } = useCurrentUserQuery();
  if (authData) {
    authData.currentUser.email ? router.push('/') : null;
  }

  if (data) {
    const { signUp } = data;
    const saveToken = async () => {
      return await localStorage.setItem('accessToken', signUp.accessToken);
    };
    saveToken();
    if (signUp) {
      router.push('/');
    } else {
      return null;
    }
  }

  if (loading) return <h2>loading...</h2>;
  return (
    <>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.bodyBackGround}
        >
          <Container maxWidth="sm">
            <Card>
              <CardContent>
                <Formik
                  initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  onSubmit={async (
                    { username, email, password },
                    { setSubmitting }
                  ) => {
                    setSubmitting(true);
                    const accessToken = await signup({
                      variables: {
                        username,
                        email,
                        password,
                      },
                    }).catch((err) => console.log(err));
                    setSubmitting(false);
                  }}
                >
                  {({ handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            type="text"
                            required
                            label="username"
                            variant="outlined"
                            fullWidth
                            name="username"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="email"
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
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Create a new account <KeyboardArrowRight />
                      </Button>
                    </form>
                  )}
                </Formik>
                <Typography
                  variant="caption"
                  gutterBottom
                  align="center"
                  style={{ margin: `0 5px` }}
                >
                  By clicking “Create a new account”, you agree to our terms of
                  service, privacy policy and cookie policy.
                </Typography>
                <Typography variant="caption" style={{ margin: `0 5px` }}>
                  <Link href="/signin">
                    <a>Already have an account?</a>
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

export default SignUp;

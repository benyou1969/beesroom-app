import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  content: Scalars['String'];
  user: User;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  messages?: Maybe<Array<Message>>;
};

export type UserWithAccessToken = {
  __typename?: 'UserWithAccessToken';
  accessToken: Scalars['String'];
  user: User;
};

export type DeletedMessage = {
  __typename?: 'DeletedMessage';
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  currentUser: User;
  messages: Array<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateProfile: User;
  uploadFile: Scalars['Boolean'];
  updateUserStatus: User;
  signUp: UserWithAccessToken;
  signIn: UserWithAccessToken;
  addMessage: Message;
  updateMessage: Message;
  deleteMessage: DeletedMessage;
};


export type MutationUpdateProfileArgs = {
  updateUserInfo: UpdateUserInfo;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateUserStatusArgs = {
  status: Scalars['Boolean'];
};


export type MutationSignUpArgs = {
  authSignUpInput: AuthSignUpInput;
};


export type MutationSignInArgs = {
  authSignInInput: AuthSignInInput;
};


export type MutationAddMessageArgs = {
  content: Scalars['String'];
};


export type MutationUpdateMessageArgs = {
  updateMessage: UpdateMessage;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
};

export type UpdateUserInfo = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};


export type AuthSignUpInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthSignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateMessage = {
  id: Scalars['String'];
  content: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onlineUsers: Array<User>;
  messages: Array<Message>;
};

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'UserWithAccessToken' }
    & Pick<UserWithAccessToken, 'accessToken'>
  ) }
);


export const SignUpDocument = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
  signUp(authSignUpInput: {username: $username, email: $email, password: $password}) {
    accessToken
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
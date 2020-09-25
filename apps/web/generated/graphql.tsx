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

export type AddMessageMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type AddMessageMutation = (
  { __typename?: 'Mutation' }
  & { addMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'createdAt' | 'id' | 'content'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    ) }
  ) }
);

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & { deleteMessage: (
    { __typename?: 'DeletedMessage' }
    & Pick<DeletedMessage, 'success'>
  ) }
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'UserWithAccessToken' }
    & Pick<UserWithAccessToken, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'username' | 'id'>
    ) }
  ) }
);

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
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'avatar' | 'isOnline'>
    ) }
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessagesSubscription = (
  { __typename?: 'Subscription' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    ) }
  )> }
);

export type OnlineUsersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnlineUsersSubscription = (
  { __typename?: 'Subscription' }
  & { onlineUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  )> }
);


export const AddMessageDocument = gql`
    mutation AddMessage($content: String!) {
  addMessage(content: $content) {
    createdAt
    id
    content
    user {
      id
      avatar
      username
    }
  }
}
    `;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;

/**
 * __useAddMessageMutation__
 *
 * To run a mutation, you first call `useAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageMutation, { data, loading, error }] = useAddMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageMutation, AddMessageMutationVariables>) {
        return Apollo.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument, baseOptions);
      }
export type AddMessageMutationHookResult = ReturnType<typeof useAddMessageMutation>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: String!) {
  deleteMessage(id: $id) {
    success
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(authSignInInput: {email: $email, password: $password}) {
    accessToken
    user {
      email
      username
      id
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
  signUp(authSignUpInput: {username: $username, email: $email, password: $password}) {
    accessToken
    user {
      username
      email
      avatar
      isOnline
    }
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
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    email
    username
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MessagesDocument = gql`
    subscription Messages {
  messages {
    id
    content
    createdAt
    user {
      id
      avatar
      username
    }
  }
}
    `;

/**
 * __useMessagesSubscription__
 *
 * To run a query within a React component, call `useMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessagesSubscription, MessagesSubscriptionVariables>) {
        return Apollo.useSubscription<MessagesSubscription, MessagesSubscriptionVariables>(MessagesDocument, baseOptions);
      }
export type MessagesSubscriptionHookResult = ReturnType<typeof useMessagesSubscription>;
export type MessagesSubscriptionResult = Apollo.SubscriptionResult<MessagesSubscription>;
export const OnlineUsersDocument = gql`
    subscription OnlineUsers {
  onlineUsers {
    id
    username
    avatar
  }
}
    `;

/**
 * __useOnlineUsersSubscription__
 *
 * To run a query within a React component, call `useOnlineUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnlineUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnlineUsersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnlineUsersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnlineUsersSubscription, OnlineUsersSubscriptionVariables>) {
        return Apollo.useSubscription<OnlineUsersSubscription, OnlineUsersSubscriptionVariables>(OnlineUsersDocument, baseOptions);
      }
export type OnlineUsersSubscriptionHookResult = ReturnType<typeof useOnlineUsersSubscription>;
export type OnlineUsersSubscriptionResult = Apollo.SubscriptionResult<OnlineUsersSubscription>;
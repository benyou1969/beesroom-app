import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Avatar, TextField } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { useRouter } from 'next/router';
import { withApollo } from '../utils/with-apollo';
import {
  useAddMessageMutation,
  useCurrentUserQuery,
  useDeleteMessageMutation,
  useMessagesSubscription,
  useOnlineUsersSubscription,
} from '../generated/graphql';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  chatTitle: {
    textAlign: 'center',
    opacity: 0.5,
  },
  chatBox: {
    height: 390,
  },
  msgSentAt: {
    opacity: 0.5,
    fontSize: 11,
  },
  avatarsBar: {
    display: 'flex',
    justifyContent: 'center',
    background: `rgb(38,38,38)`,
    padding: `4px 4px !important`,
  },
}));

const Chat = () => {
  const router = useRouter();

  const { loading, error, data: authData } = useCurrentUserQuery();
  const [state, setState] = useState({ content: '' });
  const [showOptions, setShowOptions] = useState(false);

  const { data } = useMessagesSubscription();
  const { data: onlineUsers } = useOnlineUsersSubscription();
  const [postMessage] = useAddMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const classes = useStyles();

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({ variables: state });
    }
    setState({ ...state, content: '' });
  };
  // if (loading) return <p>Loading...</p>;
  // if (!authData) return null;
  // if (error) {
  // console.log(error);
  // router.push('/login');
  // }
  const dateFormater = (sentAt) => {
    let date = new Date(sentAt);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  // if (data) {
  //   return <div>{JSON.stringify(data)}</div>;
  // }
  // const handleDeletingMessage = (id) => {
  //   console.log('Hello');
  // };
  if (!data) return null;
  return (
    <>
      <div style={{ padding: '0 5px' }}>
        <Card>
          <CardContent>
            <div className={classes.chatTitle}>Bad Guys</div>
          </CardContent>
          <CardContent>
            <ScrollToBottom animatingToEnd>
              <div className={classes.chatBox}>
                {data.messages.map(
                  ({ id, user, createdAt: sentAt, content: body }) => (
                    <div
                      style={{
                        display: 'flex',
                        margin: `10px 0`,
                        justifyContent:
                        user.id === authData.currentUser.id
                        ? 'flex-end'
                        : 'flex-start',
                      }}
                      key={id}
                    >
                      <Avatar
                        alt={user.username}
                        src={user.avatar}
                        style={{
                          marginRight: 10,
                          display:
                          user.id === authData.currentUser.id ? 'none' : '',
                        }}
                      >
                        {user.avatar ? null : `${user.username.charAt(0)}`}
                      </Avatar>

                      <div>
                        <span
                          id="messageBody"
                          style={{
                            background:
                            user.id === authData.currentUser.id
                            ? `rgb(239, 206,74)`
                            : `#dfe6e9b0`,
                            padding: `4px 10px`,
                            borderRadius: `4px`,
                          }}
                          onClick={() => setShowOptions(!showOptions)}
                        >
                          {body}
                        </span>
                        {/* {showOptions && user.id === authData.currentUser.id ? (
                          <span onMouseOver={handleDeletingMessage(id)}>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              disableRipple

                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        ) : null} */}
                        <br />
                        <span
                          title={sentAt}
                          id="sentAt"
                          className={classes.msgSentAt}
                        >
                          {dateFormater(sentAt)}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </ScrollToBottom>
            <br />
            <TextField
              id="filled-basic"
              variant="filled"
              fullWidth
              value={state.content}
              onChange={(event) =>
                setState({ ...state, content: event.target.value })
              }
              onKeyUp={(event) => {
                if (event.keyCode === 13) onSend();
              }}
            />
          </CardContent>
        </Card>
      </div>
      <br />
      <Card>
        <CardContent className={classes.avatarsBar}>
          {onlineUsers
            ? onlineUsers.onlineUsers.map(({ id, avatar, username }) => (
                <span
                  key={id}
                  style={{
                    margin: '0 5px',
                  }}
                >
                  <Avatar alt={username} src={avatar} />
                </span>
              ))
            : null}
        </CardContent>
      </Card>
    </>
  );
};

export default withApollo({ ssr: false })(Chat);

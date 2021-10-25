import React from 'react';
import propTypes from 'prop-types';

const ChatLogBox = props => {
  const { continueFlag, isMyMessage, author, message, time } = props;
  let avatarClass = 'chat__log__avatar';
  if (continueFlag) {
    avatarClass += ' chat__log__avatar-none';
  }
  console.log(isMyMessage, author, message, time);

  if (!isMyMessage) {
    return (
      <div className="chat__log">
        <div className={avatarClass} />
        <div className="chat__log__message-wrap">
          {continueFlag ? (
            ''
          ) : (
            <span className="chat__log__author">{author}</span>
          )}
          <span className="chat__log__message">{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="chat__log chat__log-me">
      <div className="chat__log__message-wrap">
        {continueFlag ? (
          ''
        ) : (
          <span className="chat__log__author">{author}</span>
        )}
        <span className="chat__log__message">{message}</span>
      </div>
      <div className={avatarClass} />
    </div>
  );
};

ChatLogBox.propTypes = {
  continueFlag: propTypes.bool.isRequired,
  isMyMessage: propTypes.bool.isRequired,
  author: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  time: propTypes.string.isRequired,
};

export default React.memo(ChatLogBox);

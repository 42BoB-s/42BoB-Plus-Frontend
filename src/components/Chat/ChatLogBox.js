import React from 'react';
import propTypes from 'prop-types';

const ChatLogBox = props => {
  const { continueFlag, isMyMessage, author, message, time } = props;
  let avatarClass = 'chat_log_avatar';
  if (continueFlag) {
    avatarClass += ' chat_log_avatar-none';
  }
  console.log(isMyMessage, author, message, time);

  if (!isMyMessage) {
    return (
      <div className="chat_log">
        <div className={avatarClass} />
        <div className="chat_log_message-wrap">
          {continueFlag ? (
            ''
          ) : (
            <span className="chat_log_author">{author}</span>
          )}
          <span className="chat_log_message">{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="chat_log chat_log-me">
      <div className="chat_log_message-wrap">
        {continueFlag ? '' : <span className="chat_log_author">{author}</span>}
        <span className="chat_log_message">{message}</span>
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

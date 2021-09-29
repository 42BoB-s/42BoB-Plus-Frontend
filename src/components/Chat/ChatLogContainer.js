import React from 'react';
import propTypes from 'prop-types';
import ChatLogBox from './ChatLogBox';

const ChatLogContainer = props => {
  const { chatLogs, bottomRef } = props;

  return (
    <section className="chat_log-container">
      {chatLogs.map((e, i) => {
        const { isMyMessage, id, author, message, time } = e;
        const continueFlag =
          i - 1 >= 0 ? author === chatLogs[i - 1].author : false;
        return (
          <ChatLogBox
            key={id}
            continueFlag={continueFlag}
            isMyMessage={isMyMessage}
            author={author}
            message={message}
            time={time}
          />
        );
      })}
      <div ref={bottomRef} />
    </section>
  );
};

ChatLogContainer.propTypes = {
  chatLogs: propTypes.arrayOf(propTypes.object).isRequired,
  bottomRef: propTypes.shape({ current: propTypes.instanceOf(Element) })
    .isRequired,
};

export default ChatLogContainer;

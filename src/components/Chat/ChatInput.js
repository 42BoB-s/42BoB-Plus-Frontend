import React, { useRef } from 'react';
import propTypes from 'prop-types';
import './Chat.scss';

const ChatInput = props => {
  const { callback } = props;

  const inputRef = useRef();
  const handleClick = () => {
    const msg = inputRef.current.value;
    callback(msg);
    inputRef.current.value = '';
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="chat__sendBox">
      <input
        className="chat__sendBox__input"
        ref={inputRef}
        onKeyPress={handleKeyPress}
      />
      <button
        className="chat__sendBox__button"
        type="button"
        onClick={handleClick}
      >
        <img alt="chat-send" src="/assets/sendIcon.png" />
      </button>
    </div>
  );
};

ChatInput.propTypes = {
  callback: propTypes.func.isRequired,
};

export default ChatInput;

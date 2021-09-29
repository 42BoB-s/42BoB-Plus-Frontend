import React from 'react';
import propTypes from 'prop-types';

const ChatHeader = props => {
  const { showModal, roomName } = props;

  return (
    <header className="chat_header">
      <img alt="navigate_before" src="/assets/navigateBefore.png" />
      <span className="chat_header_name">{roomName}</span>
      <button className="chat_header_button" type="button" onClick={showModal}>
        <img alt="room-info" src="/assets/roomInfoButton2.svg" />
      </button>
    </header>
  );
};

ChatHeader.propTypes = {
  roomName: propTypes.string.isRequired,
  showModal: propTypes.func.isRequired,
};

export default ChatHeader;

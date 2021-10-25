import React from 'react';
import propTypes from 'prop-types';

const ChatHeader = props => {
  const { showModal, roomName } = props;

  return (
    <header className="chat__header">
      <img alt="navigate__before" src="/assets/navigateBefore.png" />
      <span className="chat__header__name">{roomName}</span>
      <button
        className="chat__header__button"
        type="button"
        onClick={showModal}
      >
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

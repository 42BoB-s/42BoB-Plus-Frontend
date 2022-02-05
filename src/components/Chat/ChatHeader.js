import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ChatHeader = props => {
  const { showModal, roomTitle } = props;
  const history = useHistory();

  const handleNavigateBeforeBtnClick = () => {
    history.goBack();
  };

  return (
    <header className="chat__header">
      <img
        alt="navigate__before"
        src="/assets/navigateBefore.png"
        onClick={handleNavigateBeforeBtnClick}
      />
      <span className="chat__header__name">{roomTitle}</span>
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
  roomTitle: propTypes.string.isRequired,
  showModal: propTypes.func.isRequired,
};

export default ChatHeader;

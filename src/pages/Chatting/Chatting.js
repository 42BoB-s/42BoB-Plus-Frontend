import React from 'react';
import Header from 'components/Header';
import Chat from 'components/Chat';
import useModal from 'utils/hooks/useModal';
import './Chatting.scss';
import { useHistory } from 'react-router-dom';
import getUserInfoFromStorage from 'utils/getUserInfoFromStorage';

const Chatting = props => {
  const history = useHistory();
  const [close, show, componentWithModal] = useModal(false);
  const { roomId, roomTitle, location, meetTime, participants } =
    history.location.state;
  const { id } = getUserInfoFromStorage();
  const userName = sessionStorage.getItem('username');
  return (
    <>
      <Header userId={id} />
      <Chat
        showModal={show}
        userName={userName}
        roomTitle={roomTitle}
        roomId={roomId}
        userId={id}
      />
      {componentWithModal(
        <>
          <div className="roomInfo">
            <table className="roomInfo__info">
              <tr>
                <td>
                  <img alt="where" src="/assets/where_icon.svg" />
                </td>
                <td>{location}</td>
              </tr>
              <tr>
                <td>
                  <img alt="menu" src="/assets/menu_icon.svg" />
                </td>
                <td>메뉴</td>
              </tr>
              <tr>
                <td>
                  <img alt="time" src="/assets/time_icon.svg" />
                </td>
                <td>{meetTime}</td>
              </tr>
            </table>
            <div className="roomInfo__description">
              <img alt="description" src="/assets/description_icon.svg" />
              <span>공지</span>
            </div>
          </div>
        </>,
      )}
    </>
  );
};

export default Chatting;

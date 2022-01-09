import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Chat from 'components/Chat';
import useModal from 'utils/hooks/useModal';
import './Chatting.scss';
import { useHistory } from 'react-router-dom';
import getUserInfoFromStorage from 'utils/getUserInfoFromStorage';
import getRoomInfo from 'apis/getRoomInfo';
import patchEnterRoom from 'apis/patchEnterRoom';
import reactDom from 'react-dom';

const Chatting = props => {
  const history = useHistory();
  const [close, show, componentWithModal] = useModal(false);
  const [isFetching, setIsFetching] = useState(false);
  const [roomInfo, setRoomInfo] = useState();
  const roomId = history.location.search.slice(1).split('roomId=')[1]; // 임시
  const { id } = getUserInfoFromStorage();
  const userName = sessionStorage.getItem('username');

  useEffect(() => {
    const fetchAndEnterRoom = async () => {
      setIsFetching(true);
      const roomInfo = (await getRoomInfo(roomId)).data.room;
      console.log(roomInfo.participants);
      if (!roomInfo.participants.includes(id)) {
        patchEnterRoom(roomId);
      }
      setRoomInfo(roomInfo);
      setIsFetching(false);
    };
    fetchAndEnterRoom();
  }, []);

  return (
    <>
      <Header userId={id} />
      <Chat
        isFetching={isFetching}
        showModal={show}
        roomTitle={roomInfo ? roomInfo.title : '로딩중'}
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
                <td>{roomInfo ? roomInfo.location : '로딩중'}</td>
              </tr>
              <tr>
                <td>
                  <img alt="menu" src="/assets/menu_icon.svg" />
                </td>
                <td>{roomInfo ? roomInfo.menus.join(',') : '로딩중'} </td>
              </tr>
              <tr>
                <td>
                  <img alt="time" src="/assets/time_icon.svg" />
                </td>
                <td>{roomInfo ? roomInfo.meetTime : '로딩중'}</td>
              </tr>
            </table>
            <div className="roomInfo__description">
              <img alt="description" src="/assets/description_icon.svg" />
              <span>{roomInfo ? roomInfo.announcement : '로딩중'}</span>
            </div>
          </div>
        </>,
      )}
    </>
  );
};

export default Chatting;

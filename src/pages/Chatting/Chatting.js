import React from 'react';
import Header from 'components/Header';
import Chat from 'components/Chat';
import useModal from 'utils/hooks/useModal';
import './Chatting.scss';

const Chatting = () => {
  const [close, show, componentWithModal] = useModal(false);
  const roomInfo = {
    where: '개포',
    menu: '중식',
    time: '21:00~22:00',
    description: '메뉴는 떡볶이 치즈 돈까스',
  };
  const userName = sessionStorage.getItem('username');
  console.log(close);
  return (
    <>
      <Header />
      <Chat showModal={show} userName={userName} />
      {componentWithModal(
        <>
          <div className="roomInfo">
            <table className="roomInfo__info">
              <tr>
                <td>
                  <img alt="where" src="/assets/where_icon.svg" />
                </td>
                <td>{roomInfo.where}</td>
              </tr>
              <tr>
                <td>
                  <img alt="menu" src="/assets/menu_icon.svg" />
                </td>
                <td>{roomInfo.menu}</td>
              </tr>
              <tr>
                <td>
                  <img alt="time" src="/assets/time_icon.svg" />
                </td>
                <td>{roomInfo.time}</td>
              </tr>
            </table>
            <div className="roomInfo__description">
              <img alt="description" src="/assets/description_icon.svg" />
              <span>{roomInfo.description}</span>
            </div>
          </div>
        </>,
      )}
    </>
  );
};

export default Chatting;

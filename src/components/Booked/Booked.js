import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import patchEnterRoom from 'apis/patchEnterRoom';

import './Booked.scss';
import useModal from '../../utils/hooks/useModal';

const Booked = ({
  location,
  title,
  meetTime,
  participants,
  isBooked,
  roomId,
  capacity,
  owner,
  menus,
}) => {
  const basicState = new Array(participants.length).fill(false);
  const [close, show, componentWithModal] = useModal(false);

  const [toggleState, setToggleState] = useState(basicState);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const history = useHistory();

  const handleBookedClick = () => {
    show();
  };

  const handleParticipateBtnClick = async () => {
    setToggleState(basicState);
    if (!isBooked) {
      await patchEnterRoom(roomId);
    }
    history.push(`/chatting?roomId=${roomId}`);
  };

  useEffect(() => {
    const parseMeetTime = meetTime.slice(-8, -3);
    setStartTime(parseMeetTime);
    const hour = parseInt(parseMeetTime.substr(0, 2), 10) + 1;
    const hourString = hour < 10 ? '0' + hour.toString() : hour.toString();
    setEndTime(hourString + parseMeetTime.substr(2));
  }, []);
  return (
    <>
      <div
        className={
          isBooked
            ? 'booked-container booked-container--booked'
            : 'booked-container'
        }
        onClick={handleBookedClick}
        role="presentation"
      >
        <div className="info">
          <div className="title">
            <span>{title}</span>
            <span className="owner-id">{owner.id}</span>
          </div>
          <ul className="info-list">
            <li>
              <img alt="location" src="/assets/where_icon.svg" />
              {location}
            </li>
            <li>
              <img alt="time" src="/assets/time_icon.svg" />
              {startTime} ~ {endTime}
            </li>
            <li>
              <img
                alt="participant"
                src="/assets/users_icon.svg"
                style={{ width: '16px', height: '16px' }}
              />
              {participants.length}/{capacity}
            </li>
            <li>
              <img alt="time" src="/assets/menu_icon.svg" />
              {menus.join(', ')}
            </li>
          </ul>
        </div>
      </div>
      {componentWithModal(
        <div className="info-modal">
          <p className="info-modal__title">참여자 정보</p>
          <div className="group">
            {participants.map((participant, i) => {
              return (
                <div className="group-person" key={participant}>
                  <img
                    className="group-person-profile"
                    alt={i}
                    src="/assets/dummyPerson.jpg"
                    role="presentation"
                  />
                  <span>{participant.id}</span>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="info-modal__btn"
            onClick={handleParticipateBtnClick}
          >
            참가하기
          </button>
        </div>,
      )}
    </>
  );
};

export default Booked;

import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import patchEnterRoom from 'apis/patchEnterRoom';

import './Booked.scss';

const Booked = ({
  location,
  title,
  meetTime,
  participants,
  isBooked,
  roomId,
}) => {
  const basicState = new Array(participants.length).fill(false);

  const [toggleState, setToggleState] = useState(basicState);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const history = useHistory();
  const hangleToggle = e => {
    if (toggleState[e.target.alt]) {
      setToggleState([...basicState]);
      return;
    }
    const temp = basicState;
    temp[e.target.alt] = temp[e.target.alt] === false;
    setToggleState([...temp]);
  };

  const handleResetFocus = async () => {
    setToggleState(basicState);
    if (!isBooked) {
      await patchEnterRoom(roomId);
    }
    history.push(`/chatting?roomId=${roomId}`);
  };
  useEffect(() => {
    const parseMeetTime = meetTime.slice(-8);
    setStartTime(parseMeetTime);
    const hour = parseInt(parseMeetTime.substr(0, 2), 10) + 1;
    setEndTime(String(hour) + parseMeetTime.substr(2));
  }, []);
  return (
    <div
      className="booked-container"
      onClick={handleResetFocus}
      role="presentation"
    >
      <div className="info">
        <div className="title">{title}</div>
        <div className="time">
          {startTime} ~ {endTime}
        </div>
        <div className="group">
          {participants.map((e, i) => {
            return (
              <div className="group-person">
                <img
                  className="group-person-profile"
                  alt={i}
                  src="assets/dummyPerson.jpg"
                  onClick={hangleToggle}
                  role="presentation"
                />
                {toggleState[i] === true && (
                  <>
                    <div
                      className="group-person-profile-focus"
                      onClick={hangleToggle}
                      role="presentation"
                    >
                      {}
                    </div>
                    <text className="group-person-id">{e}</text>
                    {/* <text className="group-person-id">temp name</text> */}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Booked;

import { React, useEffect, useState } from 'react';
import './Booked.scss';

const Booked = ({ location, title, meetTime, participants, isBooked }) => {
  const basicState = new Array(participants.length).fill(false);

  const [toggleState, setToggleState] = useState(basicState);
  let parseMeetTime;
  let endTime;
  const hangleToggle = e => {
    if (toggleState[e.target.alt]) {
      setToggleState([...basicState]);
      return;
    }
    const temp = basicState;
    temp[e.target.alt] = temp[e.target.alt] === false;
    setToggleState([...temp]);
  };
  const handleClicked = () => {
    alert('클릭 이벤트');
  };
  const handleResetFocus = () => {
    setToggleState(basicState);
  };
  useEffect(() => {
    console.log(meetTime);
    parseMeetTime = meetTime.slice(-8);
    const hour = parseInt(parseMeetTime.substr(0, 2), 10) + 1;
    endTime = String(hour) + parseMeetTime.substr(2);
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
          {parseMeetTime} ~ {endTime}
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
                      {/* {똑같은 크기의 div를 만들어서 색 입혀서 하이라이트 된 것처럼} */}
                    </div>
                    <text className="group-person-id">{e}</text>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isBooked ? (
        <div className="button">
          <button type="button" onClick={handleClicked}>
            <img src="assets/chat.png" alt="chat" />
          </button>
          <button type="button" onClick={handleClicked}>
            <img src="assets/quit.png" alt="chat" />
          </button>
        </div>
      ) : (
        <div className="button">
          <button type="button" onClick={handleClicked}>
            <img src="assets/enter.png" alt="chat" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Booked;

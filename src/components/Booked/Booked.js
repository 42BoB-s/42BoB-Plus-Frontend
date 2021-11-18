import { React, useState } from 'react';
import axios from 'axios';
import './Booked.scss';

const Booked = ({ title, startTime, endTime, member, isBooked, roomId }) => {
  console.log('ddd', roomId);
  const basicState = new Array(member.length).fill(false);
  const [toggleState, setToggleState] = useState(basicState);

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
          {member.map((e, i) => {
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
                    {}
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
          <button type="button" onClick={() => axios.patch(`/room/${roomId}`)}>
            <img src="assets/enter.png" alt="chat" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Booked;

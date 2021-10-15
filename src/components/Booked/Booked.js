import { React, useState, useEffect } from 'react';
import './Booked.scss';

const Booked = ({ title, startTime, endTime, member, isBooked }) => {
  const basicState = new Array(member.length).fill(false);
  const [toggleState, setToggleState] = useState(basicState);

  useEffect(() => {
    console.log('state change');
  }, [toggleState]);

  const hangleToggle = e => {
    if (toggleState[e.target.alt]) {
      console.log('same!');
      setToggleState([...basicState]);
      return;
    }
    const temp = basicState;
    temp[e.target.alt] = temp[e.target.alt] === false;
    setToggleState(prevState => {
      console.log(prevState);
      return [...temp];
    });
  };

  const clicked = () => {
    alert('클릭 이벤트');
  };
  const resetFocus = () => {
    setToggleState(basicState);
    console.log('초기화');
  };
  return (
    <div className="booked-container" onClick={resetFocus} role="presentation">
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
          <button type="button" onClick={clicked}>
            <img src="assets/chat.png" alt="chat" />
          </button>
          <button type="button" onClick={clicked}>
            <img src="assets/quit.png" alt="chat" />
          </button>
        </div>
      ) : (
        <div className="button">
          <button type="button" onClick={clicked}>
            <img src="assets/enter.png" alt="chat" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Booked;

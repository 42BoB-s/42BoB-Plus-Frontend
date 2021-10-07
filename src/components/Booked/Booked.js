import { React, useState, useEffect } from 'react';
import './Booked.scss';

const Booked = ({ title, startTime, endTime, member, isBooked }) => {
  const [toggleState, setToggleState] = useState(() =>
    new Array(member.length).fill('false'),
  );
  const [asdf, setAsdf] = useState();

  const changeStyle = e => {
    e.target.className =
      e.target.className === 'group-person-profile-focus'
        ? 'group-person-profile'
        : 'group-person-profile-focus';
  };
  useEffect(() => {
    console.log('state change');
  }, [asdf]);

  const ToggleOn = e => {
    const temp = toggleState;
    temp[e.target.alt] = true;
    console.log('on');

    changeStyle(e);
    setToggleState(temp);
    setAsdf('heasg');
  };

  const ToggleOff = e => {
    const temp = toggleState;
    temp[e.target.alt] = false;
    console.log('off');

    changeStyle(e);
    setToggleState(temp);
  };

  const clicked = () => {
    alert('Dsadas');
  };
  return (
    <div className="booked-container">
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
                  onMouseEnter={ToggleOn}
                  onMouseLeave={ToggleOff}
                  onFocus=""
                  onBlur=""
                />
                {toggleState[i] === true && (
                  <text className="group-person-id">{e}</text>
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

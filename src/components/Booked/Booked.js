import React from 'react';
import './Booked.scss';

const Booked = ({ data }) => {
  const changeStyle = e => {
    console.log(e.target);
    e.target.className =
      e.target.className === 'group-person-profile-focus'
        ? 'group-person-profile'
        : 'group-person-profile-focus';
  };

  return (
    <div className="booked-container">
      <div className="info">
        <div className="title">{data.title}</div>
        <div className="time">
          {data.startTime} ~ {data.endTime}
        </div>
      </div>

      <div className="group">
        {data.member.map(e => (
          <div className="group-person">
            <img
              className="group-person-profile"
              alt={e}
              src="assets/dummyPerson.jpg"
              onMouseOver={changeStyle}
              onMouseOut={changeStyle}
              onFocus=""
              onBlur=""
            />
            <text className="group-person-id">{e}</text>
          </div>
        ))}
      </div>

      <div className="button">
        <text className="talking">대화하기</text>

        <text className="cancel">취소하기</text>
      </div>
    </div>
  );
};

export default Booked;

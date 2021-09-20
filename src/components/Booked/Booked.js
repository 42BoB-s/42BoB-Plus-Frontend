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
      <section className="booked">
        <div className="inner">
          <ul className="contents">
            <li className="title">{data.title}</li>
            <li className="time">
              {data.startTime} ~ {data.endTime}
            </li>
          </ul>

          <ul className="group">
            {data.member.map(e => (
              <div className="group-person">
                <li>
                  <img
                    className="group-person-profile"
                    alt={e}
                    src="https://cdn.icon-icons.com/icons2/1904/PNG/512/profile_121261.png"
                    onMouseOver={changeStyle}
                    onMouseOut={changeStyle}
                    onFocus=""
                    onBlur=""
                  />
                </li>
                <li className="group-person-id">{e}</li>
              </div>
            ))}
          </ul>

          <ul className="button">
            <li className="talking">취소하기</li>
            <li className="cancel">대화하기</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Booked;

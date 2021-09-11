import React from 'react';
import './Booked.scss';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import { styled } from '@material-ui/core/styles';

// const circleStyle = styled(AccountCircleIcon)({
//   height: 30,
//   width: 30,
//   color: 'white',
// });

const Booked = () => {
  return (
    <section className="Booked">
      <div className="inner">
        <ul className="contents">
          <li className="title">짬뽕 먹어요!</li>
          <li className="time">11:00-12:00</li>
        </ul>
        <ul className="peoples">
          <li>chahan</li>
          <li>yeoncha</li>
          <li>sham</li>
          <li>tjeong</li>
        </ul>
        <ul className="button">
          <li className="talking">채팅하기</li>
          <li className="cancel">취소하기</li>
        </ul>
      </div>
    </section>
  );
};

export default Booked;

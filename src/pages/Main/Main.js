import Header from 'components/Header';
import React from 'react';
import './Main.scss';

const Main = () => {
  return (
    <>
      <Header />
      <div className="inner">
        <div className="friend">
          <div className="title">내 밥 친구 목록</div>
        </div>
      </div>
    </>
  );
};

export default Main;

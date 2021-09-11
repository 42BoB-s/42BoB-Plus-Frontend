import { Header } from 'components';
import Booked from 'components/Booked';
import React from 'react';
import './Main.scss';

const Main = () => {
  return (
    <>
      <Header />
      <main>
        <div className="inner">
          <div className="friend">
            <div className="friend__title">내 밥 친구 목록</div>
            <Booked />
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;

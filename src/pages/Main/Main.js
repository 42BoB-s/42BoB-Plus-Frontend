// import { Header } from 'components';
// import Booked from 'components/Booked';
import MakeBook from 'components/MakeBook';
import React, { useState } from 'react';
import './Main.scss';

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <button type="button" onClick={openModal}>
        메뉴 선택하기
      </button>
      <MakeBook open={modalOpen} close={closeModal} />
      {/* <Header />
      <main>
        <div className="inner">
          <div className="friend">
            <div className="friend__title">내 밥 친구 목록</div>
            <Booked />
          </div>
        </div>
      </main>
      <section className="makebook">
        <div className="inner">asd</div>
      </section> */}
    </>
  );
};

export default Main;

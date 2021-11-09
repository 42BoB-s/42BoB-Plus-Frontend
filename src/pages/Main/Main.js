import Header from 'components/Header';
import { React, useRef, useState, useCallback, useEffect } from 'react';
import Booked from 'components/Booked';
import MakeBookApp from 'components/MakeBookApp';
import './Main.scss';
// import TestCard from 'components/testCard';
import getRoomList from 'apis/getRoomList';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';

const Main = () => {
  const [currPageIndex, setCurrPageIndex] = useState(1);
  const [roomList, setLoomList] = useState([]);
  // sham 코드
  const [modalOpen, setModalOpen] = useState(false);
  const [bookedData, setBookedData] = useState([]);

  useEffect(() => {
    setBookedData([
      {
        title: '같이 짬뽕 먹어요!',
        startTime: '20:00',
        endTime: '21:00',
        member: ['sham', 'chahan', 'yeoncha'],
      },
      {
        title: '같이 치킨 먹어요!',
        startTime: '22:00',
        endTime: '23:00',
        member: ['sham', 'chahan', 'yeoncha', 'tjeong'],
      },
    ]);
  }, []);
  // sham 코드

  const fetchRoomList = async pageIndex => {
    const response = await getRoomList(pageIndex);
    if (response) {
      setLoomList(prev => [...prev, ...response]);
    }
  };

  const handleIntersect = useCallback(async () => {
    await fetchRoomList(currPageIndex);
    setCurrPageIndex(preState => preState + 1);
  }, [currPageIndex]);

  const footerRef = useRef();
  const [target, setTarget] = useIntersectionObserver({
    onIntersect: handleIntersect,
    targetElement: footerRef,
    options: { rootMargin: '10px' },
    changeDetection: currPageIndex,
  });

  const nameInputRef = useRef();
  const handleClick = () => {
    sessionStorage.setItem('username', nameInputRef.current.value);
  };

  console.log(target, setTarget);
  console.log(currPageIndex, setCurrPageIndex, roomList);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <input ref={nameInputRef} />
      <button aria-label="saveName" type="button" onClick={handleClick}>
        임시저장
      </button>
      <div className="main-container">
        <text className="booked-title">
          <text className="booked-title-bold">내 밥 친구</text> 목록
        </text>
        {bookedData.map(data => {
          return (
            <Booked
              title={data.title}
              startTime={data.startTime}
              endTime={data.endTime}
              member={data.member}
              isBooked="true"
            />
          );
        })}
        <button className="make-book-button" type="button" onClick={openModal}>
          <div className="icon">
            <img src="assets/makeBookButtonIcon.png" alt="" />
          </div>
          <text className="text">
            <p>직접 메뉴를 골라 </p>
            <p>밥 친구를 모집해보세요!</p>
          </text>
        </button>
        <MakeBookApp open={modalOpen} close={closeModal} />
        {roomList.map(e => {
          return (
            <Booked
              location={e.location}
              title={e.title}
              meetTime={e.meetTime}
              participants={e.owner}
              isBooked={modalOpen}
            />
            /*
              <Booked
              title={e.title}
              startTime="10:00"
              endTime="12:00"
              member={e.participants}
              isBooked={modalOpen}
            />
          <TestCard
            roomId={e.roomId}
            title={e.title}
            menus={e.menus}
            meetTime={e.meetTime}
            location={e.location}
            capacity={e.capacity}
            owner={e.owner}
            participants={e.participants}
            status={e.status}
          />
          */
          );
        })}
      </div>

      <footer ref={footerRef} />
    </>
  );
};

export default Main;

import Header from 'components/Header';
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  Component,
} from 'react';
import Booked from 'components/Booked';
import MakeBookApp from 'components/MakeBookApp';
import './Main.scss';
// import TestCard from 'components/testCard';
import getRoomList from 'apis/getRoomList';
import { getRooms } from 'apis';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import useModal from 'utils/hooks/useModal';
import { RoomFilter, defaultFilterInfo } from 'components/RoomFilter';
import axios from 'axios';

const Main = () => {
  const [currPageIndex, setCurrPageIndex] = useState(0);
  const [roomList, setRoomList] = useState([]);
  const [close, show, componentWithModal] = useModal(false);
  const [roomFilterInfo, setRoomFilterInfo] = useState({
    ...defaultFilterInfo,
    isNotFilterActive: true,
  });

  const getRoomsData = async filterInfo => {
    const response = await getRooms(currPageIndex, 10, filterInfo);
    return response.data;
  };

  const handleIntersect = useCallback(async () => {
    const responseData = await getRoomsData(roomFilterInfo);
    if (responseData.roomList.length) {
      setCurrPageIndex(preState => preState + 1);
      setRoomList(prev => [...prev, ...responseData.roomList]);
    }
  }, [currPageIndex, roomFilterInfo]);

  const callback = async filterInfo => {
    setRoomFilterInfo({ ...filterInfo });
    setRoomList([]);
    setCurrPageIndex(0);
  };

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

  // sham님 코드

  const [modalOpen, setModalOpen] = useState(false);
  const [bookedData, setBookedData] = useState([]);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.cssText = `
      position: fixed; 
      overflow-y: scroll;
      width: 100%;`;
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.cssText = `
      position: static; `;
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <input ref={nameInputRef} />
      <button aria-label="saveName" type="button" onClick={handleClick}>
        임시저장
      </button> */}
      <button type="button" onClick={() => axios.post('/room/debug_random')}>
        추가
      </button>
      <div className="main-container">
        <text className="booked-title">
          <text className="booked-title-bold">내 밥 친구</text> 목록
        </text>
        {bookedData.map(data => {
          return (
            <Booked
              location="서초"
              title={data.title}
              meetTime={data.startTime}
              participants={data.member}
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
        <div className="rooms-header">
          <span>
            <span className="rooms-header__rooms-number">
              {roomList.length ?? 0}개
            </span>
            의 방
          </span>
          <div className="rooms-header__right">
            <button
              type="button"
              className={
                roomFilterInfo.isNotFilterActive
                  ? 'rooms-header__filter-btn'
                  : 'rooms-header__filter-btn rooms-header__filter-btn--active'
              }
              onClick={show}
            >
              필터 {roomFilterInfo.isNotFilterActive ? 'off' : 'on'}
            </button>
            <select className="rooms-header__sort-btn">
              <option>시간순</option>
              <option>모집 인원순</option>
            </select>
          </div>
        </div>

        <MakeBookApp open={modalOpen} close={closeModal} />
        {roomList.map(e => {
          return (
            <Booked
              location={e.location}
              title={e.title}
              meetTime={e.meetTime}
              participants={e.participants}
              isBooked={modalOpen}
              roomId={e.id}
            />
          );
        })}
      </div>

      <footer ref={footerRef} />
      {componentWithModal(
        <RoomFilter callback={callback} handleClickClose={close} />,
      )}
    </>
  );
};

export default Main;

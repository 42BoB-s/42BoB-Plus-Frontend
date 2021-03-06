import Header from 'components/Header';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Booked from 'components/Booked';
import MakeBookApp from 'components/MakeBookApp';
import MakeBookWeb from 'components/MakeBookWeb';

import './Main.scss';
import { isMobile } from 'react-device-detect';

// import TestCard from 'components/testCard';
import { getRooms } from 'apis';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import useModal from 'utils/hooks/useModal';
import { RoomFilter, defaultFilterInfo } from 'components/RoomFilter';
import axios from 'axios';
import getUserInfo from 'apis/getUserInfo';
import getMyRoom from 'apis/getMyRoom';

const Main = () => {
  const [currPageIndex, setCurrPageIndex] = useState(0);
  const [roomList, setRoomList] = useState([]);
  const [myRoomList, setMyRoomList] = useState([]);
  const [close, show, componentWithModal] = useModal(false);
  const [roomFilterInfo, setRoomFilterInfo] = useState({
    ...defaultFilterInfo,
    isNotFilterActive: true,
  });
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const saveUserInfo = async () => {
      const response = await getUserInfo();
      const reponseUserInfo = response?.data?.user;
      window.localStorage.setItem('userInfo', JSON.stringify(reponseUserInfo));
      setUserInfo({ ...reponseUserInfo });
    };
    const fetchMyRoom = async () => {
      const response = await getMyRoom();
      setMyRoomList([...response.data?.roomList].reverse());
    };
    saveUserInfo();
    fetchMyRoom();
  }, []);

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
    const isNotFilterOn =
      Object.entries(filterInfo).toString() ===
      Object.entries(defaultFilterInfo).toString();

    setRoomFilterInfo({ ...filterInfo, isNotFilterActive: isNotFilterOn });
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

  // sham??? ??????

  const [modalOpen, setModalOpen] = useState(false);
  // const [bookedData, setBookedData] = useState([]);

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

  // ????????? ??????
  const apiInputRef = useRef();
  const [apiMethod, setApiMethod] = useState('GET');

  return (
    <>
      <Header userId={userInfo?.id} />
      <div className="main-container">
        <text className="booked-title">
          <text className="booked-title-bold">??? ??? ??????</text> ??????
        </text>
        {myRoomList.map(e => {
          return (
            <Booked
              location={e.location}
              title={e.title}
              meetTime={e.meetTime}
              participants={e.participants}
              isBooked={true}
              roomId={e.id}
              capacity={e.capacity}
              owner={e.owner}
              menus={e.menus}
            />
          );
        })}
        <button className="make-book-button" type="button" onClick={openModal}>
          <div className="icon">
            <img src="assets/makeBookButtonIcon.png" alt="" />
          </div>
          <text className="text">
            <p>?????? ????????? ?????? </p>
            <p>??? ????????? ??????????????????!</p>
          </text>
        </button>
        <div className="rooms-header">
          <span>
            <span className="rooms-header__rooms-number">
              {roomList.length ?? 0}???
            </span>
            ??? ???
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
              ?????? {roomFilterInfo.isNotFilterActive ? 'off' : 'on'}
            </button>
            <select className="rooms-header__sort-btn">
              <option>?????????</option>
              <option>?????? ?????????</option>
            </select>
          </div>
        </div>
        {isMobile ? (
          <MakeBookApp
            open={modalOpen}
            close={closeModal}
            roomList={roomList}
            setRoomList={setRoomList}
          />
        ) : (
          <MakeBookWeb
            open={modalOpen}
            close={closeModal}
            roomList={roomList}
            setRoomList={setRoomList}
          />
        )}

        {roomList.map(e => {
          return (
            <Booked
              location={e.location}
              title={e.title}
              meetTime={e.meetTime}
              participants={e.participants}
              isBooked={false}
              roomId={e.id}
              capacity={e.capacity}
              owner={e.owner}
              menus={e.menus}
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

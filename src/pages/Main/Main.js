import Header from 'components/Header';
import React, { useRef, useState, useCallback } from 'react';
import './Main.scss';
import TestCard from 'components/testCard';
import getRoomList from 'apis/getRoomList';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';

const Main = () => {
  const [currPageIndex, setCurrPageIndex] = useState(1);
  const [roomList, setLoomList] = useState([]);

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

  console.log(target, setTarget);

  const nameInputRef = useRef();

  const handleClick = () => {
    sessionStorage.setItem('username', nameInputRef.current.value);
  };

  console.log(currPageIndex, setCurrPageIndex, roomList);

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

      {roomList.map(e => {
        return (
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
        );
      })}
      <footer ref={footerRef} />
    </>
  );
};

export default Main;

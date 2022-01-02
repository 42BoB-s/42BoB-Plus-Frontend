import React, { useState, useRef } from 'react';
import { postMakeRoom } from 'apis';
import Swipe from 'react-easy-swipe';
import SelectPlace from './SelectPlace';
import SelectMenu from './SelectMenu';

import './MakeBook.scss';

const getTime = (date, hour, minute) => {
  const time = new Date();
  let postMonth = time.getMonth() + 1;
  postMonth = postMonth < 10 ? '0' + postMonth : postMonth;
  let postDate = date === '오늘' ? time.getDate() : time.getDate() + 1;
  postDate = postDate < 10 ? '0' + postDate : postDate;
  const postHour = hour < 10 ? '0' + hour : hour;
  const postMinute = minute < 10 ? '0' + minute : minute;
  return (
    time.getFullYear() +
    '-' +
    postMonth +
    '-' +
    postDate +
    ' ' +
    postHour +
    ':' +
    postMinute +
    ':00'
  );
};

const getPostData = (title, selectedMenu, meetTime, place) => {
  return {
    title,
    menus: selectedMenu,
    meetTime,
    location: place,
    announcement: 'what?',
    capacity: 4,
    status: 'active',
  };
};

const getRoomData = (location, title, meetTime, id) => {
  return {
    location,
    title,
    meetTime,
    participants: ['saddas'],
    isBooked: false,
    id,
  };
};

const MakeBook = ({ open, close, roomList, setRoomList }) => {
  const [title, setTitle] = useState('');
  const time = useRef(new Date());
  const curHour = useRef(time.current.getHours() + 1);
  const curMinute = useRef(time.current.getMinutes());
  const [place, setPlace] = useState('개포');
  const [date, setDate] = useState('오늘');
  const [hour, setHour] = useState(curHour.current - 1);
  const [minute, setMinute] = useState(curMinute.current);
  const [prevPos, setPrevPos] = useState(0);
  const menu = useRef([
    '아무거나',
    '한식',
    '중식',
    '일식',
    '양식',
    '커피',
    '편의점',
    '빵',
    '분식',
    '배달음식',
    '술',
    '도시락',
  ]);
  const [menuIndex, setMenuIndex] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const handleCloseFunction = async () => {
    const meetTime = getTime(date, hour, minute);
    const postData = getPostData(title, selectedMenu, meetTime, place);
    console.log(postData);
    const result = await postMakeRoom(postData);
    console.log(result.data.roomId);
    const room = getRoomData(place, title, meetTime, result.data.roomId);
    roomList.push(room);
    setRoomList(roomList);
    close();
    // history.push('/chat?roomId=1');
  };
  const handleChangeSubmit = e => {
    setTitle(e.target.value);
  };

  const toggleDate = cur => {
    if (cur !== date) {
      setDate(cur);
      // console.log('change');
    }
  };

  const returnButton = value => {
    const className = value === date ? 'selected' : 'not-selected';
    return (
      <div
        className={className}
        role="presentation"
        onClick={() => {
          toggleDate(value);
        }}
      >
        {value}
      </div>
    );
  };

  const handleSwipe = (position, callback, direction) => {
    // console.log('test');
    const pos = direction === 'row' ? position.x : position.y;
    const value = direction === 'row' ? 10 : 5;
    const curPos = Math.floor(pos / value);
    if (curPos > prevPos) {
      // console.log('plus :', curPos);
      callback(-1);
      setPrevPos(curPos);
    } else if (curPos < prevPos) {
      // console.log('minus :', curPos);
      callback(1);
      setPrevPos(curPos);
    }
  };

  const onSwipeEnd = () => {
    setPrevPos(0);
  };

  const handleDirectionWheel = e => {
    const value = e;
    if (value > 0 && place === '개포') {
      setPlace('서초');
    } else if (value < 0 && place === '서초') {
      setPlace('개포');
    }
  };

  const handleHourWheel = e => {
    const value = e;
    if (value < 0) {
      setHour(hour === 0 ? 23 : hour - 1);
    } else if (value > 0) {
      setHour(hour === 23 ? 0 : hour + 1);
    }
  };

  const handleMinuteWheel = e => {
    const value = e;
    if (value < 0) {
      if (minute === 0) {
        setMinute(59);
        setHour(hour === 0 ? 23 : hour - 1);
      } else {
        setMinute(minute - 1);
      }
    } else if (value > 0) {
      if (minute === 59) {
        setMinute(0);
        setHour(hour === 23 ? 0 : hour + 1);
      } else {
        setMinute(minute + 1);
      }
    }
  };

  const handleMenuWheel = e => {
    const max = menu.current.length - 1;
    const min = 0;
    const value = e;
    if (value < 0) {
      setMenuIndex(menuIndex === min ? max : menuIndex - 1);
    } else if (value > 0) {
      setMenuIndex(menuIndex === max ? min : menuIndex + 1);
    }
  };

  const makeDirectionWheel = () => {
    return (
      <Swipe
        className="place"
        onSwipeMove={e => {
          handleSwipe(e, handleDirectionWheel, 'col');
        }}
      >
        {place === '개포' && <div className="dummy">{}</div>}
        {place === '개포' ? (
          <div>개포</div>
        ) : (
          <div className="unselected">개포</div>
        )}
        {place === '서초' ? (
          <div>서초</div>
        ) : (
          <div className="unselected">서초</div>
        )}
        {place === '서초' && <div className="dummy">{}</div>}
      </Swipe>
    );
  };

  const makeHourWheel = () => {
    const prev = hour === 0 ? 23 : hour - 1;
    const next = hour === 23 ? 0 : hour + 1;
    return (
      <Swipe
        onSwipeMove={e => {
          handleSwipe(e, handleHourWheel, 'col');
        }}
        onSwipeEnd={onSwipeEnd}
        className="curHour"
      >
        <div className="unselected">{prev}</div>
        <div>{hour}</div>
        <div className="unselected">{next}</div>
      </Swipe>
    );
  };
  const makeMinuteWheel = () => {
    const prev = minute === 0 ? 59 : minute - 1;
    const next = minute === 59 ? 0 : minute + 1;
    return (
      <Swipe
        onSwipeMove={e => {
          handleSwipe(e, handleMinuteWheel, 'col');
        }}
        onSwipeEnd={onSwipeEnd}
        className="curMinute"
      >
        <div className="unselected">{prev}</div>
        <div>{minute}</div>
        <div className="unselected">{next}</div>
      </Swipe>
    );
  };

  const handleSelectMenu = e => {
    if (selectedMenu.length < 5) {
      const select = menu.current[menuIndex];
      const last = menu.current[menu.current.length - 1];
      setSelectedMenu(prev => [...prev, select]);
      menu.current = menu.current.filter(c => c !== select);
      if (last === select) {
        setMenuIndex(0);
      }
    }
  };

  const deleteSelectMenu = e => {
    const select = e.target.innerText;
    setSelectedMenu(prev => prev.filter(c => c !== select));
    menu.current = [...menu.current, select];
  };

  const makeMenu = () => {
    const curMenu = menu.current;
    const max = menu.current.length - 1;
    const min = 0;
    const prev = menuIndex === min ? max : menuIndex - 1;
    const next = menuIndex === max ? min : menuIndex + 1;
    return (
      <Swipe
        onSwipeMove={e => {
          handleSwipe(e, handleMenuWheel, 'row');
        }}
        onSwipeEnd={onSwipeEnd}
        className="curMenu"
      >
        <div className="unselected">{curMenu[prev]}</div>
        <div role="presentation">{curMenu[menuIndex]}</div>
        <div className="unselected">{curMenu[next]}</div>
      </Swipe>
    );
  };

  // 모달 이외의 창 클릭 시 사라지게끔.
  const handleClickIsOuter = e => {
    const clicked = e.target.className;
    if (clicked === 'modal') close();
  };

  return (
    <>
      {open && (
        <div className="modal" onClick={handleClickIsOuter} role="presentation">
          <div className="section">
            <body>
              <img src="assets/makeBookIcon1.png" alt="img" className="img1" />

              <input
                type="text"
                className="input-room"
                onChange={handleChangeSubmit}
                value={title}
                placeholder="방 제목"
              />
              <div className="select-date">
                {returnButton('오늘')}
                {returnButton('내일')}
              </div>
              <SelectPlace
                makeDirectionWheel={makeDirectionWheel}
                makeHourWheel={makeHourWheel}
                makeMinuteWheel={makeMinuteWheel}
              />

              <SelectMenu
                makeMenu={makeMenu}
                selectedMenu={selectedMenu}
                handleClickRemoveMenu={deleteSelectMenu}
                onClickMenu={handleSelectMenu}
              />
            </body>
            <footer>
              <button
                type="button"
                className="finish"
                onClick={handleCloseFunction}
              >
                방 생성
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default MakeBook;

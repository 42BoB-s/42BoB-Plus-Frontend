import React, { useState, useRef, useEffect } from 'react';
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

const MakeBookWeb = ({ open, close, roomList, setRoomList }) => {
  const [title, setTitle] = useState('');
  const time = useRef(new Date());
  const curHour = useRef(time.current.getHours() + 1);
  const curMinute = useRef(time.current.getMinutes());
  const [place, setPlace] = useState('개포');
  const [date, setDate] = useState('오늘');
  const [hour, setHour] = useState(curHour.current - 1);
  const [minHour, setMinHour] = useState(time.current.getHours() + 1); // 시각의 0을 치환
  const [minute, setMinute] = useState(curMinute.current);
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

  useEffect(() => {
    console.log('Web!');

    if (date === '오늘') {
      console.log('오늘!');
      setMinHour(time.current.getHours() + 1);
    } else setMinHour(0);
    console.log('min : ', minHour);
    if (hour < minHour) setHour(minHour);
  }, [date, minHour]);

  const handleCloseFunction = async () => {
    if (title === '') {
      alert('제목을 입력하세요!');
      return;
    }
    if (selectedMenu.length === 0) {
      alert('메뉴를 선택하세요!');
      return;
    }
    const meetTime = getTime(date, hour, minute);
    const postData = getPostData(title, selectedMenu, meetTime, place);
    const roomId = await postMakeRoom(postData);
    switch (roomId) {
      case -1: {
        // alert('error!');
        console.log(roomId);
        break;
      }
      default: {
        console.log(roomId);
        const room = getRoomData(place, title, meetTime, roomId);
        roomList.push(room);
        setRoomList(roomList);
      }
    }
    close();
    // history.push('/chat?roomId=1');
  };

  const handleChangeSubmit = e => {
    setTitle(e.target.value);
  };

  const toggleDate = cur => {
    if (cur !== date) {
      setDate(cur);
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

  const handleDirectionWheel = e => {
    const value = e.deltaY;
    if (value > 0 && place === '개포') {
      setPlace('서초');
    } else if (value < 0 && place === '서초') {
      setPlace('개포');
    }
  };

  const handleHourWheel = e => {
    const value = e.deltaY;
    if (value < 0) {
      setHour(hour <= minHour ? 23 : hour - 1);
    } else if (value > 0) {
      setHour(hour === 23 ? minHour : hour + 1);
    }
  };

  const handleMinuteWheel = e => {
    const value = e.deltaY;
    if (value < 0) {
      if (minute === 0) {
        setMinute(59);
        setHour(hour <= minHour ? 23 : hour - 1);
      } else {
        setMinute(minute - 1);
      }
    } else if (value > 0) {
      if (minute === 59) {
        setMinute(0);
        setHour(hour === 23 ? minHour : hour + 1);
      } else {
        setMinute(minute + 1);
      }
    }
  };

  const handleMenuWheel = e => {
    const max = menu.current.length - 1;
    const min = 0;
    const value = -e.deltaY;
    if (value < 0) {
      setMenuIndex(menuIndex === min ? max : menuIndex - 1);
    } else if (value > 0) {
      setMenuIndex(menuIndex === max ? min : menuIndex + 1);
    }
  };

  const makeDirectionWheel = () => {
    return (
      <div className="direction" onWheel={handleDirectionWheel}>
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
      </div>
    );
  };

  const makeHourWheel = () => {
    const prev = hour <= minHour ? 23 : hour - 1;
    const next = hour === 23 ? minHour : hour + 1;

    return (
      <div className="curHour" onWheel={handleHourWheel}>
        <div className="unselected">{prev}</div>
        <div>{hour}</div>
        <div className="unselected">{next}</div>
      </div>
    );
  };

  const makeMinuteWheel = () => {
    const prev = minute === 0 ? 59 : minute - 1;
    const next = minute === 59 ? 0 : minute + 1;
    return (
      <div className="curMinute" onWheel={handleMinuteWheel}>
        <div className="unselected">{prev}</div>
        <div>{minute}</div>
        <div className="unselected">{next}</div>
      </div>
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
      <div className="curMenu" onWheel={handleMenuWheel}>
        <div className="unselected">{curMenu[prev]}</div>
        <div role="presentation">{curMenu[menuIndex]}</div>
        <div className="unselected">{curMenu[next]}</div>
      </div>
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

export default MakeBookWeb;

import React, { useState, useRef } from 'react';
import SelectPlace from './SelectPlace';
import SelectMenu from './SelectMenu';
import './MakeBook.scss';

const MakeBook = ({ open, close }) => {
  const [title, setTitle] = useState('');
  const time = useRef(new Date());
  const curHour = useRef(time.current.getHours() + 1);
  const curMinute = useRef(time.current.getMinutes());
  const [direction, setDirection] = useState('개포');
  const [hour, setHour] = useState(curHour.current - 1);
  const [minute, setMinute] = useState(curMinute.current);
  const defaultMenu = useRef([
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

  const setSubmit = e => {
    setTitle(e.target.value);
  };

  const handleCloseFunction = () => {
    console.log(
      `방 제목 : ${title} 선택한 공간 : ${direction} ${hour}시 ${minute}분. 선택한 메뉴 ${selectedMenu}.`,
    );
    setTitle('');
    setHour(curHour.current);
    setMinute(curMinute.current);
    setSelectedMenu([]);
    menu.current = defaultMenu.current;
    close();
  };

  const handleDirectionWheel = e => {
    const value = e.deltaY;
    if (value > 0 && direction === '개포') {
      setDirection('서초');
    } else if (value < 0 && direction === '서초') {
      setDirection('개포');
    }
  };

  const handleHourWheel = e => {
    const value = e.deltaY;
    if (value < 0) {
      setHour(hour === 0 ? 23 : hour - 1);
    } else if (value > 0) {
      setHour(hour === 23 ? 0 : hour + 1);
    }
  };

  const handleMinuteWheel = e => {
    const value = e.deltaY;
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
    const value = e.deltaY;
    if (value < 0) {
      setMenuIndex(menuIndex === min ? max : menuIndex - 1);
    } else if (value > 0) {
      setMenuIndex(menuIndex === max ? min : menuIndex + 1);
    }
  };

  const makeDirectionWheel = () => {
    return (
      <div className="direction" onWheel={handleDirectionWheel}>
        {direction === '개포' && <div className="dummy">{}</div>}
        {direction === '개포' ? (
          <div>개포</div>
        ) : (
          <div className="unselected">개포</div>
        )}
        {direction === '서초' ? (
          <div>서초</div>
        ) : (
          <div className="unselected">서초</div>
        )}
        {direction === '서초' && <div className="dummy">{}</div>}
      </div>
    );
  };

  const makeHourWheel = () => {
    const prev = hour === 0 ? 23 : hour - 1;
    const next = hour === 23 ? 0 : hour + 1;
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
      const select = e.target.innerText;
      const last = menu.current[menu.current.length - 1];
      setSelectedMenu(prev => [...prev, select]);
      menu.current = menu.current.filter(c => c !== select);
      if (last === select) {
        console.log('마지막꺼!');
        setMenuIndex(0);
      }
    }
  };

  const deleteSelectMenu = e => {
    const select = e.target.innerText;
    console.log(select);
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
        <div role="button" onClick={handleSelectMenu} onKeyDown="" tabIndex={0}>
          {curMenu[menuIndex]}
        </div>
        <div className="unselected">{curMenu[next]}</div>
      </div>
    );
  };

  // 모달 이외의 창 클릭 시 사라지게끔.
  const handleIsOuter = e => {
    const clicked = e.target.className;
    if (clicked === 'modal') close();
  };

  return (
    <>
      {open && (
        <div className="modal" onClick={handleIsOuter} role="presentation">
          <div className="section">
            <body>
              <input
                type="text"
                className="input-room"
                onChange={setSubmit}
                value={title}
                placeholder="방 제목"
              />
              <SelectPlace
                makeDirectionWheel={makeDirectionWheel}
                makeHourWheel={makeHourWheel}
                makeMinuteWheel={makeMinuteWheel}
              />
              <SelectMenu
                makeMenu={makeMenu}
                selectedMenu={selectedMenu}
                deleteSelectMenu={deleteSelectMenu}
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

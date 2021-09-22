import React, { useState, useRef } from 'react';
import './MakeBook.scss';

const MakeBook = ({ open, close }) => {
  const [title, setTitle] = useState('');
  const time = useRef(new Date());
  const curHour = useRef(time.current.getHours() + 1);
  const curMinute = useRef(time.current.getMinutes());
  const [direction, setDirection] = useState('개포');
  const [hour, setHour] = useState(curHour.current);
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

  const setSubmit = e => {
    setTitle(e.target.value);
  };

  const closeFunction = () => {
    setTitle('');
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

    console.log(`index : ${menuIndex}`);
    console.log(menu);
  };

  const makeDirectionWheel = () => {
    return (
      <div className="direction" onWheel={handleDirectionWheel}>
        {direction === '개포' && <div className="dummy">{}</div>}
        <div>개포</div>
        <div>서초</div>
        {direction === '서초' && <div className="dummy">{}</div>}
      </div>
    );
  };

  const makeHourWheel = () => {
    const prev = hour === 0 ? 23 : hour - 1;
    const next = hour === 23 ? 0 : hour + 1;
    return (
      <div className="curHour" onWheel={handleHourWheel}>
        <div>{prev}</div>
        <div>{hour}</div>
        <div>{next}</div>
      </div>
    );
  };
  const makeMinuteWheel = () => {
    const prev = minute === 0 ? 59 : minute - 1;
    const next = minute === 59 ? 0 : minute + 1;
    return (
      <div className="curMinute" onWheel={handleMinuteWheel}>
        <div>{prev}</div>
        <div>{minute}</div>
        <div>{next}</div>
      </div>
    );
  };

  const selectMenu = e => {
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
        <div>{curMenu[prev]}</div>
        <div role="button" onClick={selectMenu} onKeyDown="" tabIndex={0}>
          {curMenu[menuIndex]}
        </div>
        <div>{curMenu[next]}</div>
      </div>
    );
  };

  return (
    <>
      {open && (
        <div className="modal">
          <div className="section">
            <input
              type="text"
              className="input-room"
              onChange={setSubmit}
              value={title}
              placeholder="방 제목"
            />
            <div className="select-place">
              {makeDirectionWheel()}
              {makeHourWheel()}
              {makeMinuteWheel()}
              <div className="split">:</div>
            </div>
            <div className="select-menu">{makeMenu()}</div>
            <div className="selected-menu">
              <div className="curSelectMenu">
                {selectedMenu.map(e => {
                  return (
                    <div
                      role="button"
                      onClick={deleteSelectMenu}
                      onKeyDown=""
                      tabIndex={0}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            </div>
            <footer>
              <button type="button" className="finish" onClick={closeFunction}>
                만들기
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default MakeBook;

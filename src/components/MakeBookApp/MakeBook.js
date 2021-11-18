import React, { useState, useRef, useEffect } from 'react';
import Swipe from 'react-easy-swipe';
import SelectPlace from './SelectPlace';
import SelectMenu from './SelectMenu';
import './MakeBook.scss';

const MakeBook = ({ open, close }) => {
  const [title, setTitle] = useState('');
  const time = useRef(new Date());
  const curHour = useRef(time.current.getHours() + 1);
  const curMinute = useRef(time.current.getMinutes());
  const [direction, setDirection] = useState('개포');
  const [date, setDate] = useState('오늘');
  const [hour, setHour] = useState(curHour.current - 1);
  const [minute, setMinute] = useState(curMinute.current);
  const [posY, setPosY] = useState(0);
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

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      console.log('end!');
    };
  }, []);

  const handleCloseFunction = () => {
    console.log(
      `방 제목 : ${title} 선택한 공간 : ${date} ${direction} ${hour}시 ${minute}분. 선택한 메뉴 ${selectedMenu}.`,
    );
    setTitle('');
    setHour(curHour.current);
    setMinute(curMinute.current);
    setSelectedMenu([]);
    menu.current = defaultMenu.current;
    close();
  };
  const handleChangeSubmit = e => {
    setTitle(e.target.value);
  };

  const toggleDate = cur => {
    if (cur !== date) {
      setDate(cur);
      console.log('change');
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

  const handleSwipe = (position, callback) => {
    console.log(position);
    console.log('test');
    const curY = Math.floor(position.y / 3);
    if (curY > posY) {
      console.log('plus :', curY);
      callback(-1);
      setPosY(curY);
    } else if (curY < posY) {
      console.log('minus :', curY);
      callback(1);
      setPosY(curY);
    }
  };
  const onSwipeEnd = () => {
    setPosY(0);
  };

  const handleDirectionWheel = e => {
    const value = e;
    if (value > 0 && direction === '개포') {
      setDirection('서초');
    } else if (value < 0 && direction === '서초') {
      setDirection('개포');
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
    const value = e.deltaY;
    if (value < 0) {
      setMenuIndex(menuIndex === min ? max : menuIndex - 1);
    } else if (value > 0) {
      setMenuIndex(menuIndex === max ? min : menuIndex + 1);
    }
  };

  const makeDirectionWheel = () => {
    return (
      <Swipe
        className="direction"
        onSwipeMove={e => {
          handleSwipe(e, handleDirectionWheel);
        }}
      >
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
      </Swipe>
    );
  };

  const makeHourWheel = () => {
    const prev = hour === 0 ? 23 : hour - 1;
    const next = hour === 23 ? 0 : hour + 1;
    return (
      <Swipe
        onSwipeMove={e => {
          handleSwipe(e, handleHourWheel);
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
          handleSwipe(e, handleMinuteWheel);
        }}
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
      const select = e.target.innerText;
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
        <div role="presentation" onClick={handleSelectMenu}>
          {curMenu[menuIndex]}
        </div>
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

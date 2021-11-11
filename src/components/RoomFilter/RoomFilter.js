import React, { useState, useRef } from 'react';
import './RoomFilter.scss';
import MenuItem from './MenuItem';

const defaultFilterInfo = {
  location: '개포',
  menu: [],
  startTime: 'default',
  endTime: 'default',
  keyword: 'default',
};

let cacheFilterInfo = defaultFilterInfo;

const menuCandidate = ['중식', '양식', '한식'];

const RoomFilter = props => {
  const { handleClickClose, callback } = props;
  const [filterInfo, setFilterInfo] = useState(cacheFilterInfo);
  const timeCandidate = Array.from({ length: 25 }, i => i).map(
    (_, e) => `${e}:00`,
  );
  const keywordRef = useRef();

  const handleClickLocation = e => {
    const selectedLocation = e.target.innerHTML;
    setFilterInfo(prev => ({ ...prev, location: selectedLocation }));
  };

  const handleChangeMenu = e => {
    const selectedMenu = e.target.value;
    if (!filterInfo.menu.includes(selectedMenu)) {
      setFilterInfo(prev => ({ ...prev, menu: [...prev.menu, selectedMenu] }));
    }
  };

  const handleChangeTime = (e, type) => {
    const selectedTime = e.target.value;
    setFilterInfo(prev => ({ ...prev, [type]: selectedTime }));
  };

  const handleClickReset = () => {
    setFilterInfo(defaultFilterInfo);
    keywordRef.current.value = '';
  };

  const handleClickSearch = () => {
    const keywordValue = keywordRef.current.value;
    setFilterInfo(prev => ({
      ...prev,
      keyword: keywordValue,
    }));
    if (!filterInfo.menu.length) {
      console.log('here');
      setFilterInfo(prev => ({
        ...prev,
        menu: ['default'],
      }));
    }
    callback(filterInfo);
    cacheFilterInfo = filterInfo;
    handleClickClose();
  };

  const removeMenu = name => {
    const filteredMenu = filterInfo.menu.filter(e => e !== name);
    setFilterInfo(prev => ({ ...prev, menu: filteredMenu }));
  };

  return (
    <section className="room-filter">
      <div className="room-filter__wrap">
        <header className="room-filter__header">
          검색 필터
          <button type="button" onClick={handleClickClose}>
            <img alt="cancel" src="/assets/cancel_icon.png" />
          </button>
        </header>
        <div className="room-filter__location">
          <button
            type="button"
            className={
              filterInfo.location === '개포'
                ? 'room-filter__button on'
                : 'room-filter__button'
            }
            onClick={handleClickLocation}
          >
            개포
          </button>
          <button
            type="button"
            className={
              filterInfo.location === '서초'
                ? 'room-filter__button on'
                : 'room-filter__button'
            }
            onClick={handleClickLocation}
          >
            서초
          </button>
        </div>
        <div className="room-filter__menu">
          <img alt="menu" src="/assets/menu_icon.svg" />
          <select className="room-filter__select" onChange={handleChangeMenu}>
            <option disabled hidden selected>
              메뉴
            </option>
            {menuCandidate.map(e => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="room-filter__time">
          <div className="room-filter__start-time">
            <img alt="time" src="/assets/time_icon.svg" />
            <select
              className="room-filter__select"
              onChange={e => handleChangeTime(e, 'startTime')}
            >
              <option
                disabled
                hidden
                selected={filterInfo.startTime === 'default'}
              >
                시간
              </option>
              {timeCandidate.map(e => (
                <option key={e} selected={e === filterInfo.startTime}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <span>~</span>
          <div className="room-filter__end-time">
            <select
              className="room-filter__select"
              onChange={e => handleChangeTime(e, 'endTime')}
            >
              <option
                disabled
                hidden
                selected={filterInfo.endTime === 'default'}
              >
                시간
              </option>
              {timeCandidate.map(e => (
                <option key={e} selected={e === filterInfo.endTime}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="room-filter__keyword">
          <img alt="search" src="/assets/search_icon.svg" />
          <input
            ref={keywordRef}
            className="room-filter__input"
            placeholder="제목 검색"
            type="text"
          />
        </div>
      </div>
      <div className="menu-box">
        {filterInfo.menu.map(e => (
          <MenuItem name={e} handleClickClose={name => removeMenu(name)} />
        ))}
      </div>
      <footer className="room-filter__footer">
        <button
          type="button"
          className="room-filter__reset-btn"
          onClick={handleClickReset}
        >
          필터 초기화
        </button>
        <button
          type="button"
          className="room-filter__confirm-btn"
          onClick={handleClickSearch}
        >
          검색
        </button>
      </footer>
    </section>
  );
};

export default RoomFilter;

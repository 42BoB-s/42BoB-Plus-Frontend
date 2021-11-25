import React, { useState } from 'react';
import './RoomFilter.scss';
import MenuItem from './MenuItem';

const defaultFilterInfo = {
  location: 'default',
  menu: ['default'],
  startTime: 'default',
  endTime: 'default',
  keyword: 'default',
};

let cacheFilterInfo = defaultFilterInfo;

const menuCandidate = ['중식', '양식', '한식', '일식'];

const RoomFilter = props => {
  const { handleClickClose, callback } = props;
  const [filterInfo, setFilterInfo] = useState(cacheFilterInfo);
  const timeCandidate = Array.from({ length: 25 }, i => i).map((_, e) => {
    const hour = e < 10 ? '0' : '';
    return hour + `${e}:00`;
  });

  const handleChangeKeyword = e => {
    setFilterInfo(prev => ({ ...prev, keyword: e.target.value }));
  };

  const getNowDateYYYYMMDDbyString = () => {
    const nowTime = new Date();
    const year = nowTime.getFullYear();
    const month = nowTime.getMonth() + 1;
    const date = nowTime.getDate();

    return `${year}-${month}-${date}`;
  };

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
    const validFormatTime =
      getNowDateYYYYMMDDbyString() + ' ' + selectedTime + ':00';
    setFilterInfo(prev => ({ ...prev, [type]: validFormatTime }));
  };

  const handleClickReset = () => {
    setFilterInfo({ ...defaultFilterInfo, isNotFilterActive: true });
  };

  const handleClickSearch = () => {
    callback(filterInfo);
    cacheFilterInfo = filterInfo;
    handleClickClose();
  };

  const removeMenu = name => {
    const filteredMenu = filterInfo.menu.filter(e => e !== name);
    setFilterInfo(prev => ({ ...prev, menu: filteredMenu }));
    if (!filterInfo.menu.length) {
      setFilterInfo(prev => ({
        ...prev,
        menu: ['default'],
      }));
    }
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
                value="default"
              >
                시간
              </option>
              {timeCandidate.map(e => (
                <option key={e} selected={e === filterInfo.startTime} value={e}>
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
                value="default"
              >
                시간
              </option>
              {timeCandidate.map(e => (
                <option key={e} selected={e === filterInfo.endTime} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="room-filter__keyword">
          <img alt="search" src="/assets/search_icon.svg" />
          <input
            onChange={handleChangeKeyword}
            className="room-filter__input"
            placeholder="제목 검색"
            type="text"
          />
        </div>
      </div>
      <div className="menu-box">
        {filterInfo.menu.map(
          e =>
            e !== 'default' && (
              <MenuItem name={e} handleClickClose={name => removeMenu(name)} />
            ),
        )}
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

export { RoomFilter, defaultFilterInfo };

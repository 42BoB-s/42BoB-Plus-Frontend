import React, { useState } from 'react';
import './RoomFilter.scss';

const defaultFilterInfo = {
  location: '개포',
  menu: ['하이'],
  startTime: '',
  endTime: '',
  keyword: '',
};

const cacheFilterInfo = defaultFilterInfo;

const menuCandidate = ['중식', '양식', '한식'];

const RoomFilter = props => {
  const { handleClickClose } = props;
  const [filterInfo, setFilterInfo] = useState(cacheFilterInfo);
  const timeCandidate = Array.from({ length: 25 }, i => i).map(
    (_, e) => `${e}:00`,
  );

  return (
    <section className="room-filter">
      <div className="room-filter__wrap">
        <header className="room-filter__header">
          검색 필터
          <button type="button" onClick={handleClickClose}>
            취소
          </button>
        </header>
        <div className="room-filter__location">
          <button type="button" className="room-filter__button">
            개포
          </button>
          <button type="button" className="room-filter__button on">
            서초
          </button>
        </div>
        <div className="room-filter__menu">
          <img alt="menu" src="/assets/menu_icon.svg" />
          <select className="room-filter__select">
            <option disabled hidden selected>
              메뉴
            </option>
          </select>
        </div>
        <div className="room-filter__time">
          <div className="room-filter__start-time">
            <img alt="time" src="/assets/time_icon.svg" />
            <select className="room-filter__select">
              <option disabled hidden selected>
                시간
              </option>
              {timeCandidate.map(e => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
          부터
          <div className="room-filter__end-time">
            <select className="room-filter__select">
              <option disabled hidden selected>
                시간
              </option>
              {timeCandidate.map(e => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
          까지
        </div>
        <div className="room-filter__keyword">
          <img alt="search" src="/assets/search_icon.svg" />
          <input className="room-filter__input" placeholder="제목 검색" />
        </div>
        <div className="room-filter__menu-box">
          {filterInfo.menu.map(e => e)}
        </div>
        <footer className="room-filter__footer">필터 초기화</footer>
      </div>
    </section>
  );
};

export default RoomFilter;

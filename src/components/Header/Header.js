import React from 'react';
import './Header.scss';
import getUserInfoFromStorage from 'utils/getUserInfoFromStorage';

const Header = props => {
  const { userId } = props;

  return (
    <header className="gnb">
      <div className="inner">
        <a href="/" className="logo">
          <img src="assets/42bobs_logo_white.png" alt="42BoBs" />
        </a>
        <div className="sub-menu">
          <ul className="menu">
            <li className="mypage">
              <a href="/mypage">{userId}</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

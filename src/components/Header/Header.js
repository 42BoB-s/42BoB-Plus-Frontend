import React from 'react';
import './Header.scss';

const Header = props => {
  const { userId } = props;
  const handleLogoutBtnClick = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  return (
    <header className="gnb">
      <div className="inner">
        <a href="/" className="logo">
          <img src="assets/42bobs_logo_white.png" alt="42BoBs" />
        </a>
        <div className="sub-menu">
          <ul className="menu">
            <li className="logout">
              <button type="button" onClick={handleLogoutBtnClick}>
                <img src="/assets/logout.png" alt="logout" />
              </button>
            </li>
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

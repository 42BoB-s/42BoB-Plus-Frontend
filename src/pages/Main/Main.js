import React from 'react';
import './Main.scss';

const Main = () => {
  return (
    <header>
      <div className="inner">
        <a href="/" className="logo">
          <img src="images/42bobs_logo.png" alt="42BoBs" />
        </a>
        <div className="sub-menu">
          <ul className="menu">
            <li className="mypage">
              <a href="/">chahan</a>
            </li>
            <li className="chatting">
              <a href="/">chatting</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Main;

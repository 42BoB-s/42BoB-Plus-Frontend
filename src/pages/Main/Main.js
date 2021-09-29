import Header from 'components/Header';
import React, { useRef } from 'react';
import './Main.scss';

const Main = () => {
  const nameInputRef = useRef();

  const handleClick = () => {
    sessionStorage.setItem('username', nameInputRef.current.value);
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <input ref={nameInputRef} />
      <button aria-label="saveName" type="button" onClick={handleClick}>
        임시저장
      </button>
    </>
  );
};

export default Main;

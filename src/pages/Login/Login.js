import React from 'react';
import './Login.scss';
import getNewTestJWT from 'apis/getNewTestJWT';

const Login = () => {
  const handleClickLogin = () => {
    window.location.replace(
      'https://minzzu.shop:443/oauth2/authorization/42seoul',
    );
  };

  const handleTestLoginBtnClick = async () => {
    const response = await getNewTestJWT();

    localStorage.setItem('token', response.data.Authorization);
    window.location.replace('/');
  };

  // TODO : 기다리는 사람 명수 끌어와야 함
  const numberOfPeopleWating = 5;
  return (
    <div className="login__wrap">
      <img
        src="/assets/42bobs_logo.png"
        alt="bobs_logo"
        className="login__logo"
      />
      <p className="login__description">
        지금{' '}
        <span style={{ fontWeight: 'bold' }}>{numberOfPeopleWating}명</span>이
        밥 친구를 찾고 있어요!
      </p>
      <button
        type="button"
        className="login__button"
        onClick={handleClickLogin}
      >
        로그인
      </button>
      <button type="button" onClick={handleTestLoginBtnClick}>
        개발용 로그인
      </button>
    </div>
  );
};

export default Login;

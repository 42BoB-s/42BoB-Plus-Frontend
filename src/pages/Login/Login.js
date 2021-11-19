import React from 'react';
import './Login.scss';

const Login = () => {
  const handleClickLogin = () => {
    window.location.replace(
      'https://api.intra.42.fr/oauth/authorize?client_id=7f35ad0adafa324c0b612c7ae29b1be2c2904dc199d62e658ab45ba55bbaf823&redirect_uri=https%3A%2F%2F3.37.178.248%3A443%2F42OAuth&response_type=code',
    );
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
    </div>
  );
};

export default Login;

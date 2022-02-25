import React from 'react';
import Routes from 'Routes';
import getSavedJWT from 'utils/getSavedJWT';

function App() {
  const location = window.location;

  let token = null;
  if (location.pathname === '/') {
    token = location.search.split('Authorization=')[1]?.replaceAll('%20', ' '); // 임시

    if (token) {
      window.localStorage.setItem('token', token);
      window.history.push('/');
    }
  }
  if (!token && !getSavedJWT() && window.location.pathname !== '/login') {
    window.location.replace('/login');
    return;
  }

  return <Routes />;
}

export default App;

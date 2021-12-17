import React from 'react';
import Routes from 'Routes';
import getSavedJWT from 'utils/getSavedJWT';
import getUserInfo from 'apis/getUserInfo';

function App() {
  if (!getSavedJWT() && window.location.pathname !== '/login') {
    window.location.replace('/login');
    return;
  }

  getUserInfo().then(console.log);

  return <Routes />;
}

export default App;

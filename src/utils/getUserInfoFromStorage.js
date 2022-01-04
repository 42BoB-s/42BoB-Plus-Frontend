const getUserInfoFromStorage = () => {
  return JSON.parse(window.localStorage.getItem('userInfo'));
};

export default getUserInfoFromStorage;

const errorHandler = e => {
  if (e.response?.status === 401) {
    window.location.replace('/login');
  }
};

export default errorHandler;

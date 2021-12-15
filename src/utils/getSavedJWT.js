const getSavedJWT = () => {
  const JWT = localStorage.getItem('token');
  return JWT;
};

export default getSavedJWT;

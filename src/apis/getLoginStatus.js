import axios from 'axios';

const getLoginStatus = async () => {
  const path = '/session';
  const response = await axios.get(path);
  return response;
};

export default getLoginStatus;

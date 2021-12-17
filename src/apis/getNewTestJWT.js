import axios from 'axios';
import END_POINT from 'apis/END_POINT';

const getNewTestJWT = async () => {
  const url = END_POINT + `/token/tmp`;
  const response = await axios.get(url);

  return response;
};

export default getNewTestJWT;

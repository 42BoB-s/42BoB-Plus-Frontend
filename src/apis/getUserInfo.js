import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const getUserInfo = async () => {
  const url = END_POINT + `/bobs/header`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
  };
  const response = await axios.get(url, config);

  return response;
};

export default getUserInfo;

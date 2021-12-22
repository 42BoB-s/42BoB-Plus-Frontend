import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const getMyLog = async () => {
  const url = END_POINT + `/bobs/mypage/mylog`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
  };
  const response = await axios.get(url, config);

  return response;
};

export default getMyLog;

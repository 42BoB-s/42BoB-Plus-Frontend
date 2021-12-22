import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const getBann = async () => {
  const url = END_POINT + `/bobs/mypage/ban`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
  };
  const response = await axios.get(url, config);

  return response;
};

export default getBann;

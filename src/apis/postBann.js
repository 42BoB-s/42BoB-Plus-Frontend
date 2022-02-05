import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const postBann = async id => {
  const url = END_POINT + `/bobs/mypage/ban/${id}`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
  };
  const response = await axios.patch(url, config);

  return response;
};

export default postBann;

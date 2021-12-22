import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const postProfile = async file => {
  const url = END_POINT + `/bobs/mypage/picture`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
    'Content-Type': 'multipart/form-data',
  };
  const response = await axios.post(url, { file }, config);

  return response;
};

export default postProfile;

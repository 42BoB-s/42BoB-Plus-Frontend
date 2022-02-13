import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const manageBann = async (id, method) => {
  const url = END_POINT + `/bobs/mypage/ban/dev`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
  };
  const body = { name: id };
  let response;
  if (method === 'patch') response = await axios.patch(url, body, config);
  else if (method === 'delete')
    response = await axios.delete(url, body, config);
  else throw Error('wrong method');
  return response;
};

export default manageBann;

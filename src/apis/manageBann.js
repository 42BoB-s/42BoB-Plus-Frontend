import axios from 'axios';
import END_POINT from 'apis/END_POINT';
// import getSavedJWT from 'utils/getSavedJWT';

const manageBann = async (id, method) => {
  const url = END_POINT + `/bobs/mypage/ban/dev`;
  const config = {
    // headers: {
    //   Authorization: getSavedJWT(),
    // },
    name: id,
  };
  let response;
  if (method === 'patch') response = await axios.patch(url, config);
  else if (method === 'delete') response = await axios.delete(url, config);
  else throw Error('wrong method');
  return response;
};

export default manageBann;

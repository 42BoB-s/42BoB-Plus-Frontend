import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const postMakeRoom = async roomData => {
  const url = END_POINT + `/bobs/room`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
  };
  const response = await axios.post(url, { roomData }, config);

  return response;
};

export default postMakeRoom;

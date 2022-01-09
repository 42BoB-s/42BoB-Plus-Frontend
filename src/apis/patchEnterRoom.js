import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const patchEnterRoom = async roomId => {
  const url = END_POINT + `/bobs/room/${roomId}`;
  const config = {
    headers: {
      Authorization: getSavedJWT(),
    },
  };
  const response = await axios.patch(url, config);

  return response;
};

export default patchEnterRoom;

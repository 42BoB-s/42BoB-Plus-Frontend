import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';
import errorHandler from './errorHandler';

const getUserInfo = async () => {
  try {
    const url = END_POINT + `/bobs/header`;
    const config = {
      headers: {
        Authorization: getSavedJWT(),
      },
    };
    const response = await axios.get(url, config);

    return response;
  } catch (error) {
    errorHandler(error);
  }
};

export default getUserInfo;

import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from '../utils/getSavedJWT';
import errorHandler from './errorHandler';

const getRooms = async (page, size, roomFilterInfo) => {
  const { location, menu, startTime, endTime, keyword } = roomFilterInfo;

  try {
    const url = END_POINT + `/bobs/rooms`;
    const query =
      `?page=${page}&size=${size}&location=${location}` +
      menu.reduce((a, c) => a + `&menu=${c.toString()}`, '') +
      `&startTime=${startTime}&endTime=${endTime}&keyword=${keyword}`;
    const config = {
      headers: {
        Authorization: getSavedJWT(),
      },
    };

    const response = await axios.get(url + query, config);
    return response;
  } catch (error) {
    errorHandler(error);
  }
};

export default getRooms;

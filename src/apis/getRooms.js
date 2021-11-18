import axios from 'axios';

const getRooms = async (page, size, roomFilterInfo) => {
  const { location, menu, startTime, endTime, keyword } = roomFilterInfo;

  const path = '/rooms';
  const query =
    `?page=${page}&size=${size}&location=${location}` +
    menu.reduce((a, c) => a + `&menu=${c.toString()}`, '') +
    `&startTime=${startTime}&endTime=${endTime}&keyword=${keyword}`;
  const response = await axios.get(path + query);
  return response;
};

export default getRooms;
